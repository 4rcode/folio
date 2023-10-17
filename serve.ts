import { fileServer } from "./deps.ts";

interface Options {
  host: string;
  port: string;
  target: string;
  watch: boolean;
}

const IMMUTABLE = "max-age=31536000, immutable";
const NO_STORE = "no-store";

export const serve = ({ host, port, target, watch }: Options) => {
  Deno.serve({ port: +port, hostname: host }, (req) =>
    fileServer.serveDir(req, {
      fsRoot: target,
      headers: [`Cache-Control: ${watch ? NO_STORE : IMMUTABLE}`],
    })
  );
};
