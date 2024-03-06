import dayjs from "dayjs";
export default function dateToHour(date: string | undefined) {
  return dayjs(date).format("HH:mm");
}
