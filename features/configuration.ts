import { expandGlob } from "./glob.ts";

export const configuration = async (options: object, ...globs: unknown[]) => {
  const settings: object = {};

  for (const glob of globs) {
    for await (
      const { path } of expandGlob(String(glob), { includeDirs: false })
    ) {
      Object.assign(settings, await import("file://" + path));
    }
  }

  return Object.assign(settings, options);
};
