import { fs } from "./deps.ts";

interface Options {
  builders: string;
  buildersArgs: string[];
  denoExecPath: string;
  source: string;
  target: string;
  watch: boolean;
}

const { Command } = Deno;

export const build = async ({
  denoExecPath,
  builders,
  buildersArgs,
  source,
  target,
  watch,
}: Options) => {
  for await (const entry of fs.expandGlob(builders, {
    root: source,
    includeDirs: false,
  })) {
    new Command(denoExecPath, {
      args: [
        "run",
        "-A",
        ...(watch ? ["--watch"] : []),
        ...buildersArgs,
        entry.path,
        target,
      ],
    }).spawn();
  }
};
