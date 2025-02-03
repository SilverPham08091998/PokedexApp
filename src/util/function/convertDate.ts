import moment from "moment";

const convertDateMicro = (date: number, format: string) => {
  return moment(date).format(format);
};

const convertDateToString = (date: Date | undefined, format?: string) => {
  if (date) {
    return moment(new Date(date)).format(format || "YYYY-MM-DD HH:mm:ss");
  }
  return "";
};

const convertTextDateToDate = (value: any) => {
  if (value === null || value === undefined || value === "" || value < 0) {
    return "";
  }
  let fullDate = new Date(value * 1000);
  if (fullDate.getFullYear() <= 1900) {
    return "";
  }
  return fullDate;
};
const convertTime = (seconds: number) => {
  let mins = parseInt("", seconds / 60)
    .toString()
    .padStart(2, "0");
  let secs = (Math.trunc(seconds) % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};
const formatDateAgo = (date: Date) => {
  moment.updateLocale("vi", {
    months: [
      "tháng 1",
      "tháng 2",
      "tháng 3",
      "tháng 4",
      "tháng 5",
      "tháng 6",
      "tháng 7",
      "tháng 8",
      "tháng 9",
      "tháng 10",
      "tháng 11",
      "tháng 12",
    ],
    relativeTime: {
      future: "trong %s",
      past: "%s trước",
      s: "một vài giây",
      ss: "%d giây",
      m: "a phút",
      mm: "%d phút",
      h: "1 giờ",
      hh: "%d giờ",
      d: "1 ngày",
      dd: "%d ngày",
      M: "một tháng",
      MM: "%d tháng",
      y: "1 năm",
      yy: "%d năm",
    },
  });
  // }
  const value = moment(date);
  return `${value.fromNow()}`;
};

const DATE_CONVERTER = {
  convertDateMicro,
  convertTextDateToDate,
  convertTime,
  convertDateToString,
  formatDateAgo,
};

export { DATE_CONVERTER };
