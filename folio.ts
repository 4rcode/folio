import { parseArgs } from "https://deno.land/std@0.217.0/cli/mod.ts";
import { folio } from "./mod.ts";

const message = `
NAME
\tfolio

DESCRIPTION

\tFolio is a portfolio and static site generator

USAGE

\tfolio [options] [glob ...]

OPTIONS

\t-h, --help
\t\tDisplays this help message

\t-s, --serve
\t\tServes target files through an HTTP server

\t-w, --watch
\t\tWatches for source files changes

GLOB

\tTODO: glob section
`;

const main = async () => {
  const {
    help,
    h: _h,
    s: _s,
    w: _w,
    _: globs,
    ...options
  } = parseArgs(Deno.args, {
    boolean: ["help", "serve", "watch"],
    alias: { h: "help", s: "serve", w: "watch" },
  });

  if (help) {
    console.log(message);
  } else {
    await folio(options, ...(globs.length ? globs : ["**/folio/*"]));
  }
};

if (import.meta.main) {
  await main();
}
