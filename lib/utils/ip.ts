import { isIP } from "node:net";

export function isValidIP(ip: string): boolean {
  return isIP(ip) !== 0;
}
