import { fs } from "./deps.ts";

interface Options {
  bundles: string;
  bundlerArgs: string[];
  denoExecPath: string;
  source: string;
  target: string;
  watch: boolean;
}

const { Command } = Deno;

export const bundle = ({
  bundles,
  bundlerArgs,
  denoExecPath,
  source,
  target,
  watch,
}: Options) => {
  const files = Array.from(
    fs.expandGlobSync(bundles, {
      root: source,
      includeDirs: false,
    })
  ).map((e) => e.path);

  if (!files.length) {
    return;
  }

  new Command(denoExecPath, {
    args: [
      "run",
      "-A",
      "npm:esbuild@0.19.11",
      "--bundle",
      `--outdir=${target}`,
      "--loader:.jpg=file",
      "--loader:.png=file",
      "--loader:.ttf=file",
      "--loader:.webp=file",
      "--loader:.woff=file",
      "--loader:.woff2=file",
      ...(watch ? ["--sourcemap", "--watch=forever"] : ["--minify"]),
      ...bundlerArgs,
      ...files,
    ],
  }).spawn();
};
