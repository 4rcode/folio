import { debounce } from "https://deno.land/std@0.217.0/async/debounce.ts";
import { expandGlob } from "./glob.ts";
import { signal } from "./signal.ts";

export interface Options {
  delay?: number;
  watch?: boolean;
}

export const watch = async (
  glob: string,
  handler: (path: string) => (...paths: string[]) => void,
  { delay, watch }: Options = {},
) => {
  await Promise.all(
    await Array.fromAsync(expandGlob(glob), async ({ path }) => {
      const handle = handler(path);

      const process = debounce((...paths: string[]) => {
        try {
          handle(...paths);
        } catch (e) {
          console.error(e);
        }
      }, delay || 50);

      process(path);

      if (!watch) {
        return;
      }

      const watcher = Deno.watchFs(path, { recursive: true });

      signal().then(() => watcher.close());

      for await (const event of watcher) {
        process(...event.paths);
      }
    }),
  );
};
