declare var require: any;
declare function setTimeout(callback: Function, delay: number): number;
declare function clearTimeout(timeoutId: number);

declare function setInterval(callback: Function, delay: number): number;
declare function clearInterval(intervalId: number);

declare var console: any;

declare interface MpEvent {
  mp: wx.InputEvent | wx.FormEvent;
}
