import { bundle, BundleOptions, CustomAtRules } from "npm:lightningcss@1";
import { basename, join } from "../deps.ts";
import { watch } from "./watch.ts";

export interface Options {
  delay?: number;
  lightning?: string;
  lightningOptions?: BundleOptions<CustomAtRules>;
  sourceMap?: boolean;
  target?: string;
  watch?: boolean;
}

export const lightning = async ({
  lightning,
  lightningOptions,
  sourceMap,
  target,
  ...options
}: Options = {}) =>
  await watch(
    lightning || "**/lightning/*",
    (path: string) => () => {
      Deno.writeFile(
        join(target || "target", basename(path)),
        bundle({
          filename: path,
          minify: !options.watch,
          sourceMap,
          ...lightningOptions,
        }).code,
      );
    },
    options,
  );
