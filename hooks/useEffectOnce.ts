import { EffectCallback, useEffect } from "react";

export function useEffectOnce(cb: EffectCallback) {
  useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
