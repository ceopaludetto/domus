import type { ColorMode } from "./utils/types";
import type { EntryContext } from "@remix-run/node";

import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { RemixServer } from "@remix-run/react";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import { ApplicationThemeProvider, createApplicationCache } from "./providers/theme";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
): Promise<Response> {
  responseHeaders.append("Vary", "Sec-CH-Prefers-Color-Scheme");
  responseHeaders.append("Accept-CH", "Sec-CH-Prefers-Color-Scheme");
  responseHeaders.append("Critical-CH", "Sec-CH-Prefers-Color-Scheme");

  const initialColorMode = (request.headers.get("sec-ch-prefers-color-scheme") ?? "light") as ColorMode;

  const cache = createApplicationCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const html = renderToString(
    <StrictMode>
      <CacheProvider value={cache}>
        <ApplicationThemeProvider initialColorMode={initialColorMode}>
          <RemixServer context={remixContext} url={request.url} />
        </ApplicationThemeProvider>
      </CacheProvider>
    </StrictMode>
  );

  const { styles } = extractCriticalToChunks(html);

  let stylesHTML = "";

  for (const { key, ids, css } of styles) {
    const emotionKey = `${key} ${ids.join(" ")}`;
    const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
    stylesHTML = `${stylesHTML}${newStyleTag}`;
  }

  // Add the emotion style tags after the insertion point meta tag
  const markup = html.replace(
    /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
    `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`
  );

  responseHeaders.set("Content-Type", "text/html");
  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
