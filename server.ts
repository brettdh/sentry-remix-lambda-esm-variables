import * as build from "@remix-run/dev/server-build";
import { installGlobals } from "@remix-run/node";
import { AWSProxy, createRequestHandler } from "remix-aws";
import sourceMapSupport from "source-map-support";

if (process.env.NODE_ENV !== "production") {
  require("./mocks");
}

installGlobals();
sourceMapSupport.install();

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  awsProxy: AWSProxy.APIGatewayV2,
});
