import { copy } from "../deps.ts";
import { watch } from "./watch.ts";

export interface Options {
  assets?: string;
  delay?: number;
  target?: string;
  watch?: boolean;
}

export const assets = async ({ assets, target, ...options }: Options = {}) => {
  await watch(
    assets || "**/assets",
    (path: string) => () => {
      copy(path, target || "target", { overwrite: true });
    },
    options,
  );
};
