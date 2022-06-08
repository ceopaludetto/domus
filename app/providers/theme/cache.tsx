import type { EmotionCache } from "@emotion/cache";
import type { Context, ReactNode } from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const createApplicationCache = (): EmotionCache => createCache({ key: "domus" });

interface ICacheContextProps {
  reset(): void;
}

const CacheContext: Context<ICacheContextProps | undefined> = createContext<ICacheContextProps | undefined>(undefined);

interface IApplicationCacheProviderProps {
  children: ReactNode;
}

export function ApplicationCacheProvider({ children }: IApplicationCacheProviderProps) {
  const [cache, setCache] = useState(createApplicationCache());

  const reset = useCallback(() => {
    setCache(createApplicationCache());
  }, []);

  const value = useMemo<ICacheContextProps>(() => ({ reset }), [reset]);

  return (
    <CacheContext.Provider value={value}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </CacheContext.Provider>
  );
}

export const useApplicationCache = (): ICacheContextProps | undefined => useContext(CacheContext);
