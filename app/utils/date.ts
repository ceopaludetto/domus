import date from "dayjs";
import pt from "dayjs/locale/pt-br";
import parse from "dayjs/plugin/customParseFormat";

date.extend(parse);
date.locale(pt);

export function toDate(value: string, format = "DD/MM/YYYY") {
  return date(value, format);
}

export function fromDate(value: Date, format = "DD/MM/YYYY") {
  return date(value).format(format);
}

export { default as date } from "dayjs";
