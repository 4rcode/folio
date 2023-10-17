import { cli } from "./deps.ts";
import { Options, folio, options } from "./mod.ts";

const message = `\
folio - Static Site Generator

USAGE:
  folio [OPTIONS]

OPTIONS:
  --assets        configures the assets path glob
                  DEFAULT: ${options.assets}

  --builders      configures the builders path glob
                  DEFAULT: ${options.builders}

  --buildersArgs  adds arguments to the builder processes
                  DEFAULT: [${options.buildersArgs}]

  --bundlerArgs   adds arguments to the bundler process
                  DEFAULT: [${options.bundlerArgs}]

  --bundles       configures the bundles path glob
                  DEFAULT: ${options.bundles}

  --denoExecPath  configures the deno executable path
                  DEFAULT: ${options.denoExecPath}

  -h, --help      displays this help message
                  DEFAULT: false

  -n, --host      configures the HTTP server hostname
                  DEFAULT: ${options.host}

  -p, --port      configures the HTTP server port
                  DEFAULT: ${options.port}

  -r, --source    configures the source (root) folder
                  DEFAULT: ${options.source}

  -s, --serve     serves target files through an HTTP server
                  DEFAULT: ${options.serve}

  -t, --target    configures the target folder
                  DEFAULT: ${options.target}

  -w, --watch     watches for file changes
                  DEFAULT: ${options.watch}

ENVIRONMENT VARIABLES:
  ASSETS          configures the assets path glob
  BUILDERS        configures the builders path glob
  BUILDERS_ARGS   adds arguments to the builder processes
  BUNDLER_ARGS    adds arguments to the bundler process
  BUNDLES         configures the bundles path glob
  DENO_EXEC_PATH  configures the deno executable path
  HOST            configures the HTTP server hostname
  PORT            configures the HTTP server port
  SERVE           serves target files through an HTTP server
  SOURCE          configures the source (root) folder
  TARGET          configures the target folder
  WATCH           watches for file changes\
`;

export const parseFlags = (): Options & { help: boolean } => {
  const opts = cli.parseArgs(Deno.args, {
    boolean: ["help", "serve", "watch"],
    alias: {
      h: "help",
      n: "host",
      p: "port",
      r: "source",
      s: "serve",
      t: "target",
      w: "watch",
    },
    string: [
      "assets",
      "builders",
      "buildersArgs",
      "bundlerArgs",
      "bundles",
      "denoExecPath",
      "host",
      "port",
      "prefix",
      "source",
      "tailwind",
      "tailwindArgs",
      "target",
    ],
    collect: ["buildersArgs", "bundlerArgs", "tailwindArgs"],
    default: { ...options, help: false },
  });

  return opts;
};

if (import.meta.main) {
  const options = parseFlags();

  if (options.help) {
    console.log(message);
  } else {
    await folio(options);
  }
}
