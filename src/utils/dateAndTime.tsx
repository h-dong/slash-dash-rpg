import { DateTime } from "luxon";

export function getTimestamp() {
  return DateTime.utc().toFormat("HH:mm:ss");
}
