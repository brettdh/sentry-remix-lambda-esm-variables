import * as SentryRemix from "@sentry/remix";
import { AWSLambda as SentryLambda } from "@sentry/serverless";
import type { Handler } from "aws-lambda";

export function initSentry(handler: Handler): Handler {
  if (!process.env.SENTRY_DSN) {
    return handler;
  }

  const commonOptions = {
    tracesSampleRate: 1,
    includeLocalVariables: true,
    attachStacktrace: true,
  };

  SentryRemix.init({
    ...commonOptions,
    integrations: [
      new SentryRemix.Integrations.LocalVariables({
        captureAllExceptions: true,
      }),
    ],
  });
  SentryLambda.init(commonOptions);

  return SentryLambda.wrapHandler(handler);
}
