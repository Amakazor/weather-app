export class DateHelper {
  private constructor() {}

  private static offsetDate = (date: Date, offsetInSeconds: number): Date =>
    new Date(date.getTime() + offsetInSeconds * 1000);

  static localDate = (
    timestampInSeconds: number,
    offsetInSeconds: number
  ): Date => {
    const temporaryDate = new Date(timestampInSeconds * 1000);
    const date = new Date(
      temporaryDate.getUTCFullYear(),
      temporaryDate.getUTCMonth(),
      temporaryDate.getUTCDate(),
      temporaryDate.getUTCHours(),
      temporaryDate.getUTCMinutes(),
      temporaryDate.getUTCSeconds()
    );

    date.setTime(date.getTime() + offsetInSeconds * 1000);

    return date;
  };

  static formatTime = (date: Date): string =>
    date.toLocaleString("en", {
      minute: "numeric",
      hour: "numeric",
      hour12: false,
    });

  static formatWeekday = (date: Date): string =>
    date.toLocaleString("en", {
      weekday: "short",
    });

  static toDate = (date: Date): string =>
    date.toLocaleString("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
}
