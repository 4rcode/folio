import { fs, path } from "./deps.ts";

interface Options {
  tailwind: string;
  tailwindArgs: string[];
  denoExecPath: string;
  source: string;
  target: string;
  watch: boolean;
}

const { Command } = Deno;
const { basename, join } = path;

export const tailwindcss = async ({
  tailwind,
  tailwindArgs,
  denoExecPath,
  source,
  target,
  watch,
}: Options) => {
  for await (const entry of fs.expandGlob(tailwind, {
    root: source,
    includeDirs: false,
  })) {
    const output = join(target, basename(entry.path));

    new Command(denoExecPath, {
      args: [
        "run",
        "-A",
        "npm:tailwindcss@3.4.0",
        "-i",
        `${entry.path}`,
        "-o",
        `${output}`,
        watch ? "-w" : "-m",
        ...tailwindArgs,
      ],
    }).spawn();
  }
};
