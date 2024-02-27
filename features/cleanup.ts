import { emptyDir } from "../deps.ts";

export interface Options {
  target?: string;
}

export const cleanup = async ({ target }: Options = {}) =>
  await emptyDir(target || "target");
