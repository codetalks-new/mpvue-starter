import * as mpex from "mpex";
import Images from "@/images";
export * from "mpex";

export function showWarn(title: string) {
  wx.showToast({
    title,
    image: Images.icWarnOutlinePng
  });
}
