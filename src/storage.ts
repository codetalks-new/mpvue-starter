export function getByKey(key: string) {
  return wx.getStorageSync(key);
}

export function setByKey(key: string, value: any) {
  return wx.setStorageSync(key, value);
}

/**
 * @param defaultValue 设置项的默认值
 * @param key 自定义其他的 key 值, 自定义 key 值可以避免代码 ugly 之后，属性名改变，然后
 *  读取不到对应值。
 */
function asSetting(defaultValue: any, key?: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDecorator
  ) {
    const pkey = key || propertyKey;
    Object.defineProperty(target, pkey, {
      get: function() {
        const ret = getByKey(propertyKey);
        if (typeof ret === "undefined") {
          return defaultValue;
        } else {
          return ret;
        }
      },

      set: function(value) {
        setByKey(propertyKey, value);
      }
    });
  } as any;
}

/**
 * 用户偏好设置存储类
 * `autoLogin` 和 `username` 是两个示范属性，可以删除
 */
class Settings {
  // @asSetting(false, "isAutoLogin")
  // autoLogin: boolean = false;
  // @asSetting(null)
  // username: string = "";
}

export const settings = new Settings();
