export const enum Key {
  auth = "auth"
}

export function getByKey(key: Key) {
  return wx.getStorageSync(key);
}

export function setByKey(key: Key, value: any) {
  return wx.setStorageSync(key, value);
}
