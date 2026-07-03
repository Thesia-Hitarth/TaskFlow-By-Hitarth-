import * as Sentry from "@sentry/nextjs";

export const logger = {
  info(message: string, ...args: unknown[]) {
    if (process.env.NODE_ENV !== "production") {
      console.log(message, ...args);
    }
  },
  error(message: string, error?: unknown, ...args: unknown[]) {
    console.error(message, error, ...args);
    if (error) {
      if (error instanceof Error) {
        Sentry.captureException(error);
      } else {
        Sentry.captureException(new Error(`${message}: ${String(error)}`));
      }
    } else {
      Sentry.captureException(new Error(message));
    }
  },
  warn(message: string, ...args: unknown[]) {
    console.warn(message, ...args);
  }
};
