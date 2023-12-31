/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import * as Sentry from "@sentry/remix";

// ignoring the client side for the purpose of this minimal example
// Sentry.init({
//     dsn: "your dsn here",
//     tracesSampleRate: 1,
//     replaysSessionSampleRate: 0.1,
//     replaysOnErrorSampleRate: 1,

//     integrations: [new Sentry.BrowserTracing({
//         routingInstrumentation: Sentry.remixRouterInstrumentation(useEffect, useLocation, useMatches)
//     }), new Sentry.Replay()]
// })

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});
