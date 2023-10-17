import { debounce, fs } from "./deps.ts";

interface Options {
  assets: string;
  source: string;
  target: string;
  watch: boolean;
}

const DELAY = 1_000;

const { watchFs } = Deno;

const watchPath = async (path: string, copy: () => void) => {
  for await (const _ of watchFs(path, { recursive: true })) {
    copy();
  }
};

export const copy = async ({ assets, source, target, watch }: Options) => {
  for await (const entry of fs.expandGlob(assets, { root: source })) {
    const { path } = entry;

    const copy = debounce.debounce(
      () => fs.copy(path, target, { overwrite: true }),
      DELAY
    );

    copy();

    if (!watch) {
      continue;
    }

    watchPath(path, copy);
  }
};
