import type { LinksFunction, MetaFunction } from "@remix-run/node";
import type { FC } from "react";

import { withEmotionCache } from "@emotion/react";
import { getInitColorSchemeScript, useTheme } from "@mui/material";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { useIsomorphicLayoutEffect } from "ahooks";

import { useApplicationCache } from "./providers/theme";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  description: "Gerencie condomínios com elegância.",
  title: "Domus",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { href: "https://fonts.googleapis.com", rel: "preconnect" },
  { crossOrigin: "anonymous", href: "https://fonts.gstatic.com", rel: "preconnect" },
  { href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap", rel: "stylesheet" },
];

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
        <meta content="emotion-insertion-point" name="emotion-insertion-point" />
        <meta content={theme.vars.palette.background.default} name="theme-color" />
      </head>
      <body>
        {getInitColorSchemeScript({ enableSystem: true })}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export default App;
