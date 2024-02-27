import {
  expandGlob as expand,
  ExpandGlobOptions,
} from "https://deno.land/std@0.217.0/fs/mod.ts";
import { joinGlobs } from "https://deno.land/std@0.217.0/path/mod.ts";

export interface Options extends ExpandGlobOptions {
  target?: string;
}

export const expandGlob = (
  glob: string | URL,
  { target, ...options }: Options = {},
) =>
  expand(glob, {
    exclude: ["**/.*/**", joinGlobs([target || "target", String(glob)])],
    ...options,
  });
