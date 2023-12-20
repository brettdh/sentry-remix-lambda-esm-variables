import * as Sentry from "@sentry/serverless";
import { ProfilingIntegration } from "@sentry/profiling-node";

Sentry.AWSLambda.init({
  includeLocalVariables: true,
  integrations: [
    new ProfilingIntegration(),
    new Sentry.Integrations.LocalVariables({
      captureAllExceptions: true,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

function baz() {
  const localBaz = {
    haveSome: "data",
  };
  throw new Error("boom");
}

function bar() {
  const localBar = "what";
  baz();
}

function foo() {
  const localFoo = 42;
  bar();
}

export const handler = Sentry.AWSLambda.wrapHandler(async (event) => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
});
