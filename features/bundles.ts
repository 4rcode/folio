import { bundle, BundleOptions } from "https://deno.land/x/emit@0.38.1/mod.ts";
import { basename, extname, join } from "../deps.ts";
import { expandGlob } from "./glob.ts";
import { watch } from "./watch.ts";

export interface Options {
  bundles?: string;
  bundlesOptions?: BundleOptions;
  delay?: number;
  target?: string;
  watch?: boolean;
  sourceMaps?: boolean;
}

export const bundles = async ({
  bundles,
  bundlesOptions,
  target,
  ...options
}: Options = {}) =>
  await watch(
    bundles || "**/bundles",
    (path: string) => async () => {
      for await (
        const { path: file } of expandGlob("*", {
          includeDirs: false,
          root: path,
        })
      ) {
        const { code, map } = await bundle(file, {
          minify: !options.watch,
          ...bundlesOptions,
        });

        const targetFilepath = join(
          target || "target",
          basename(file, extname(file)) + ".js",
        );

        await Deno.writeTextFile(targetFilepath, code);

        if (map) {
          await Deno.writeTextFile(targetFilepath + ".map", map);
        }
      }
    },
    options,
  );
