import { getTimestamp } from "./dateAndTime";

export function generateLog(logs: string, log: string): string {
  return `<span>${getTimestamp()} - ${log}</span><br />${logs}`;
}
