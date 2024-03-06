import dayjs from "dayjs";
export default function dateToDay(date: string | undefined) {
  return dayjs(date).format("dddd");
}
