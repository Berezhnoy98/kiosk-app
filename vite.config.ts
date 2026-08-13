import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rss-proxy',
      configureServer(server) {
        server.middlewares.use('/api/rss', async (req, res) => {
          try {
            const url = new URL((req as any).url ?? '/', 'http://localhost');
            const feedUrl = url.searchParams.get('url');

            if (!feedUrl) {
              res.statusCode = 400;
              res.end('Missing url param');
              return;
            }

            const response = await fetch(feedUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0',
                Accept: 'application/rss+xml, application/xml, text/xml, */*',
              },
              redirect: 'follow',
            });

            const text = await response.text();
            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.end(text);
          } catch (error) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(
              error instanceof Error
                ? error.message
                : 'RSS proxy request failed',
            );
          }
        });
      },
    },
  ],
})
