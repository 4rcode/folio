import { renderToStaticMarkup } from "https://esm.sh/preact-render-to-string@6.4.0";
import { VNode } from "https://esm.sh/preact@10.19.6";
import { write as writeFile } from "./text.ts";

const DOCTYPE = "<!DOCTYPE html>";

export const write = async (element: VNode, ...segments: string[]) =>
  await writeFile(
    DOCTYPE + renderToStaticMarkup(element),
    ...segments,
  );
