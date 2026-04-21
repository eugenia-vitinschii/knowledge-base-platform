//fromat date

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function formatJoinedDate(date: string | Date) {
   return dayjs(date).fromNow()
}