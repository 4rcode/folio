import {
  serveDir,
  ServeFileOptions,
} from "https://deno.land/std@0.217.0/http/file_server.ts";
import { signal } from "./signal.ts";

export interface Options
  extends Deno.ServeOptions, Partial<Deno.ServeTlsOptions>, ServeFileOptions {
  serve?: boolean;
  target?: string;
  watch?: boolean;
}

const IMMUTABLE = "max-age=31536000, immutable";
const NO_STORE = "no-store";

export const serve = async (
  { serve, target, watch, ...options }: Options = {},
) => {
  if (serve) {
    const server = Deno.serve(
      {
        hostname: "127.0.0.1",
        port: 8080,
        ...options,
      },
      (req) =>
        serveDir(req, {
          fsRoot: target || "target",
          headers: ["Cache-Control: " + (watch ? NO_STORE : IMMUTABLE)],
          ...options,
        }),
    );

    await signal();
    await server.shutdown();
  }
};
