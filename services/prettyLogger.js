// /services/prettyLogger.js

import pino from "pino";

export const prettyLogger = pino({
  transport: {
    target: "pino-pretty",
  },
});
