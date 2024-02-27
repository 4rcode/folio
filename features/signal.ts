const signals: Deno.Signal[] = ["SIGINT", "SIGBREAK", "SIGTERM"];

export const signal = () =>
  new Promise<Deno.Signal>((resolve) => {
    for (const signal of signals) {
      const listener = () => {
        Deno.removeSignalListener(signal, listener);
        resolve(signal);
      };

      try {
        Deno.addSignalListener(signal, listener);
      } catch (_) {
        // ignored
      }
    }
  });
