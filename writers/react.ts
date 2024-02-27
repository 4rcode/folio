import { renderToStaticMarkup } from "https://esm.sh/react-dom@18.2.0/server";
import { ReactElement } from "https://esm.sh/react@18.2.0";
import { write as writeFile } from "./text.ts";

const DOCTYPE = "<!DOCTYPE html>";

export const write = async (
  element: ReactElement,
  ...segments: string[]
) =>
  await writeFile(
    DOCTYPE + renderToStaticMarkup(element),
    ...segments,
  );
