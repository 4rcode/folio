export interface Options {
  assets: string;
  builders: string;
  buildersArgs: string[];
  bundlerArgs: string[];
  bundles: string;
  denoExecPath: string;
  host: string;
  port: string;
  serve: boolean;
  source: string;
  tailwind: string;
  tailwindArgs: string[];
  target: string;
  watch: boolean;
}

const { cwd, env, execPath } = Deno;
const { get } = env;

export const labels: {
  [key in keyof Options]: string;
} = Object.freeze({
  assets: "",
  builders: "",
  buildersArgs: "",
  bundlerArgs: "",
  bundles: "",
  denoExecPath: "",
  host: "",
  port: "",
  serve: "",
  source: "",
  tailwind: "",
  tailwindArgs: "",
  target: "",
  watch: "",
});

export const options: Options = Object.freeze({
  assets: get("ASSETS") || "**/assets",
  builders: get("BUILDERS") || "**/*.x.*",
  buildersArgs: get("BUILDERS_ARGS")?.split(/\s+/) || [],
  bundlerArgs: get("BUNDLER_ARGS")?.split(/\s+/) || [],
  bundles: get("BUNDLES") || "**/*.b.*",
  denoExecPath: get("DENO_EXEC_PATH") || execPath(),
  host: get("HOST") || "127.0.0.1",
  port: get("PORT") || "8080",
  serve: get("SERVE")?.toLowerCase() === "true",
  source: get("SOURCE") || cwd(),
  tailwind: get("TAILWIND") || "**/*.t.*",
  tailwindArgs: get("TAILWIND_ARGS")?.split(/\s+/) || [],
  target: get("TARGET") || "target",
  watch: get("WATCH")?.toLowerCase() === "true",
});
