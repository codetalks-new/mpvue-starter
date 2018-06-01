import * as mpex from "mpex";
export * from "mpex";

export function showWarn(title: string) {
  mpex.showToast(title);
}
