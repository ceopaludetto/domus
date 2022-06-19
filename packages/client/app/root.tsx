import type { MetaFunction } from "@remix-run/node";
import type { FC } from "react";

import { withEmotionCache } from "@emotion/react";
import { useTheme } from "@mui/material";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { useIsomorphicLayoutEffect } from "ahooks";

import { Fonts } from "./assets";
import { useApplicationCache } from "./providers/theme";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Domus",
  description: "Gerencie condomínios com elegância.",
  viewport: "width=device-width,initial-scale=1",
});

const App: FC = withEmotionCache((props, emotionCache) => {
  const cache = useApplicationCache();
  const theme = useTheme();

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line no-param-reassign
    emotionCache.sheet.container = document.head;

    const { tags } = emotionCache.sheet;
    emotionCache.sheet.flush();
    for (const tag of tags) {
      // eslint-disable-next-line no-underscore-dangle
      (emotionCache.sheet as any)._insertTag(tag);
    }

    cache?.reset();
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
        <meta name="color-scheme" content={theme.palette.mode} />
        <meta name="theme-color" content={theme.palette.background.default} />
      </head>
      <body>
        <Fonts />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export default App;
