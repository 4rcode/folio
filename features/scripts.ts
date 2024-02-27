import { expandGlob } from "./glob.ts";

export interface Options {
  denoExecPath?: string;
  scripts?: string;
  target?: string;
  watch?: boolean;
}

export const scripts = async ({
  denoExecPath,
  scripts,
  target,
  watch,
}: Options = {}) => {
  await Promise.all(
    await Array.fromAsync(
      expandGlob(scripts || "**/scripts/*", {
        includeDirs: false,
      }),
      async ({ path: file }) => {
        await using process = new Deno.Command(
          denoExecPath || Deno.execPath(),
          {
            args: [
              "run",
              "-A",
              ...(watch ? ["--watch"] : []),
              file,
              target || "target",
            ],
          },
        ).spawn();

        await process.output();
      },
    ),
  );
};
