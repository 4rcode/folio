import { basename, join } from "../deps.ts";
import { expandGlob } from "./glob.ts";

export interface Options {
  denoExecPath?: string;
  tailwind?: string;
  tailwindOptions?: string[];
  target?: string;
  watch?: boolean;
}

export const tailwind = async ({
  denoExecPath,
  tailwind,
  tailwindOptions,
  target,
  watch,
}: Options = {}) => {
  await Promise.all(
    await Array.fromAsync(
      expandGlob(tailwind || "**/tailwind/*", {
        includeDirs: false,
      }),
      async ({ path: filePath }) => {
        await using process = new Deno.Command(
          denoExecPath || Deno.execPath(),
          {
            args: [
              "run",
              "-A",
              "npm:tailwindcss@3",
              watch ? "-w" : "-m",
              "-i",
              filePath,
              "-o",
              join(target || "target", basename(filePath)),
              ...(tailwindOptions || []),
            ],
          },
        ).spawn();

        await process.output();
      },
    ),
  );
};
