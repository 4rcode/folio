import { assets } from "./features/assets.ts";
import { bundles } from "./features/bundles.ts";
import { cleanup } from "./features/cleanup.ts";
import { configuration } from "./features/configuration.ts";
import { esbuild } from "./features/esbuild.ts";
import { lightning } from "./features/lightning.ts";
import { plugins } from "./features/plugins.ts";
import { scripts } from "./features/scripts.ts";
import { serve } from "./features/serve.ts";
import { tailwind } from "./features/tailwind.ts";

export const folio = async (options: object = {}, ...globs: unknown[]) => {
  options = await configuration(options, ...globs);

  await cleanup(options);

  serve(options);

  await Promise.all([
    assets(options),
    bundles(options),
    esbuild(options),
    lightning(options),
    scripts(options),
    tailwind(options),
    ...plugins(options),
  ]);
};
