import { isDev } from "@/utils";
import Log from "@/logbox";

export const globalApiHttpErrorHandlers = {};

export interface ApiRequestOptions extends wx.RequestOptions {
  /**
   * 请求名称
   */
  reqName?: string;
}

export const devResponseInterceptors: { [key: string]: () => any } = {};

export function apiRequest<R>(req: ApiRequestOptions): Promise<R> {
  return new Promise(function(resolve, reject) {
    const method = req.method || "GET";
    const reqName = req.reqName || "unkown";
    if (isDev) {
      const respIntercepttor = devResponseInterceptors[reqName];
      if (respIntercepttor) {
        Log.warn(`${reqName} was intercepted`);
        const resp = (respIntercepttor() as any) as R;
        resolve(resp);
        return;
      }
    }
    req.success = (resp: wx.Response) => {
      Log.info(`[DONE][${reqName}][${method}][${req.url}] ${resp.statusCode} `);
      if (resp.statusCode == 200) {
        const r = (resp.data as any) as R;
        resolve(r);
      } else {
        const handler = globalApiHttpErrorHandlers[resp.statusCode];
        if (handler && typeof handler === "function") {
          handler();
        }
        reject("请求出错 " + resp.statusCode);
      }
    };
    req.fail = () => {
      Log.error(`[FAIL][${reqName}][${method}][${req.url}]`);
      reject("请求出错");
    };
    wx.request(req);
  });
}

export function request(req: wx.Request): Promise<wx.Response> {
  return new Promise(function(resolve, reject) {
    // TODO add some log
    const options: wx.RequestOptions = { url: "" };
    Object.assign(options, req);
    const method = req.method || "GET";
    // const promise = new Promise()
    options.success = (res: wx.Response) => {
      Log.info(`[DONE][${method}][${req.url}] ${res.statusCode} `, res.data);
      resolve(res);
    };
    options.fail = () => {
      reject("请求出错");
    };
    Log.info(`[BEGIN][${method}][${req.url}] data:`, req.data);
    wx.request(options);
  });
}
