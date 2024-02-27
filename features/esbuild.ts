import { BuildOptions, context, Loader, stop } from "npm:esbuild@0";
import { expandGlob } from "./glob.ts";
import { signal } from "./signal.ts";

export interface Options {
  esbuild?: string;
  esbuildOptions?: BuildOptions;
  sourceMap?: boolean;
  target?: string;
  watch?: boolean;
}

const loaders = [
  "bmp",
  "gif",
  "jpg",
  "png",
  "svg",
  "ttf",
  "webp",
  "woff",
  "woff2",
].reduce((value, key) => {
  value["." + key] = "file";
  return value;
}, {} as { [ext: string]: Loader });

export const esbuild = async ({
  esbuild,
  esbuildOptions: {
    loader,
    ...esbuildOptions
  } = {},
  target,
  watch,
  sourceMap,
}: Options = {}) => {
  const files = await Array.fromAsync(
    expandGlob(esbuild || "**/esbuild/*", {
      includeDirs: false,
    }),
    (e) => e.path,
  );

  if (!files.length) {
    return;
  }

  const ctx = await context({
    bundle: true,
    entryPoints: files,
    loader: {
      ...loaders,
      ...loader,
    },
    minify: !watch,
    outdir: target || "target",
    sourcemap: sourceMap,
    ...esbuildOptions,
  });

  if (watch) {
    await ctx.watch();
    await signal();
  } else {
    await ctx.rebuild();
  }

  await ctx.dispose();
  await stop();
};
