import config from "../config/config.json";

export function getConfig(): { embedmodel: string; mainmodel: string } {
  return config;
}
