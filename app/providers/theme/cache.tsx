import type { EmotionCache } from "@emotion/cache";
import type { Context, ReactNode } from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const createApplicationCache = (): EmotionCache => createCache({ key: "domus" });

interface ICacheContextProperties {
  reset(): void;
}

const CacheContext: Context<ICacheContextProperties | undefined> = createContext<ICacheContextProperties | undefined>(
  undefined
);

interface IApplicationCacheProviderProperties {
  children: ReactNode;
}

export function ApplicationCacheProvider({ children }: IApplicationCacheProviderProperties) {
  const [cache, setCache] = useState(createApplicationCache());

  const reset = useCallback(() => {
    setCache(createApplicationCache());
  }, []);

  const value = useMemo<ICacheContextProperties>(() => ({ reset }), [reset]);

  return (
    <CacheContext.Provider value={value}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </CacheContext.Provider>
  );
}

export const useApplicationCache = (): ICacheContextProperties | undefined => useContext(CacheContext);
