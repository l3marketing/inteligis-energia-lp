export const isDev = import.meta.env.DEV;
const ENABLE_LOGS = String(import.meta.env.VITE_ENABLE_LOGS).toLowerCase() === "true" || String(import.meta.env.VITE_ENABLE_LOGS) === "1";

type Level = "debug" | "info" | "warn" | "error";

const make = (level: Level) => (...args: unknown[]) => {
  if (isDev || ENABLE_LOGS) {
    (console as Console)[level](...args);
  }
};

export const log = {
  debug: make("debug"),
  info: make("info"),
  warn: make("warn"),
  error: make("error"),
};

