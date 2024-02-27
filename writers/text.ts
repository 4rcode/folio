import { ensureDir, join } from "../deps.ts";

export interface Options {
  fileName?: string;
}

export const write = async (
  text: string,
  ...segments: string[]
) => {
  const folder = join(Deno.args[0] || "target", ...segments);

  await ensureDir(folder);
  await Deno.writeTextFile(join(folder, "index.html"), text);
};
