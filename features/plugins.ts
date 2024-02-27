export interface Options {
  plugins?: ((options: object) => unknown)[];
}

export const plugins = (options: Options = {}) =>
  (options.plugins || []).map((plugin) => plugin(options));
