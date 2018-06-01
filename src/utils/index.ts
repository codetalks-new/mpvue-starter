function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function isoDateString(date: Date): string {
  const str = date.toISOString();
  return str.substr(0, 10);
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}

export function encodeQuery(object: object): string {
  const kvArray: string[] = [];
  for (const key in object) {
    if (!object.hasOwnProperty(key)) {
      continue;
    }
    const kv = encodeURIComponent(key) + "=" + encodeURIComponent(object[key]);
    kvArray.push(kv);
  }
  return kvArray.join("&");
}

export class Duration {
  constructor(public totalSeconds: number) {}

  dec(seconds: number = 1) {
    this.totalSeconds -= seconds;
  }

  inc(seconds: number = 1) {
    this.totalSeconds += seconds;
  }

  get hours(): number {
    return Math.floor(this.totalSeconds / (60 * 60));
  }
  get minutes(): number {
    const seconds = this.totalSeconds % 3600;
    return Math.floor(seconds / 60);
  }

  get seconds(): number {
    return this.totalSeconds % 60;
  }

  get milliseconds(): number {
    return this.totalSeconds * 1000;
  }

  get minutesSeconds(): string {
    const m = this.minutes;
    const s = this.seconds;
    const mstr = m > 10 ? m.toString() : "0" + m;
    const sstr = s > 10 ? s.toString() : "0" + s;
    return mstr + ":" + sstr;
  }

  get hoursMinutesSeconds(): string {
    const h = this.hours;
    const m = this.minutes;
    const s = this.seconds;
    const hstr = h > 10 ? h.toString() : "0" + h;
    const mstr = m > 10 ? m.toString() : "0" + m;
    const sstr = s > 10 ? s.toString() : "0" + s;
    return hstr + ":" + mstr + ":" + sstr;
  }
}

/**
 * 等待一段时间
 * @param seconds 等待的时间
 */
export function wait(seconds: number): Promise<boolean> {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}
