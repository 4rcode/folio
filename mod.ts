import { build } from "./build.ts";
import { bundle } from "./bundle.ts";
import { copy } from "./copy.ts";
import { fs, path } from "./deps.ts";
import { Options, options } from "./options.ts";
import { serve } from "./serve.ts";
import { tailwindcss } from "./tailwindcss.ts";

export * from "./build.ts";
export * from "./bundle.ts";
export * from "./copy.ts";
export * from "./options.ts";
export * from "./serve.ts";
export * from "./tailwindcss.ts";

const { args, writeTextFile } = Deno;
const { dirname, join } = path;

export const folio = async (options: Options) => {
  await fs.emptyDir(options.target);

  if (options.serve) {
    serve(options);
  }

  await Promise.all([
    build(options),
    bundle(options),
    copy(options),
    tailwindcss(options),
  ]);
};

export const write = async (path: string, text: string) => {
  const file = join(args[0] || options.target, path);
  const folder = dirname(file);

  await fs.ensureDir(folder);

  writeTextFile(file, text);
};
