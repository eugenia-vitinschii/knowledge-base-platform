//fromat date

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

//hire date
export function formatJoinedDate(date?: string | Date) {
   if (!date) return '';
   return dayjs(date).fromNow()
}


//birth
export function formatBirthday(date?: string | Date) {
   if (!date) return '';

   return dayjs(date).format('D MMM');
}