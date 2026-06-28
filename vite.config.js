import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { join } from 'path'
import { pathToFileURL } from 'url'

/** Vercel-style response shim (supports setHeader / OPTIONS / arbitrary status). */
function createWrappedRes(innerRes) {
  const outgoing = {};
  let statusCode = 200;
  const flushHeaders = () => {
    for (const [k, v] of Object.entries(outgoing)) innerRes.setHeader(k, v);
  };
  return {
    status(code) {
      statusCode = code;
      return this;
    },
    setHeader(key, val) {
      outgoing[String(key)] = typeof val === 'string' ? val : String(val);
      return this;
    },
    json(obj) {
      flushHeaders();
      innerRes.statusCode = statusCode;
      innerRes.setHeader('Content-Type', 'application/json');
      innerRes.end(JSON.stringify(obj));
    },
    end(payload) {
      flushHeaders();
      innerRes.statusCode = statusCode;
      innerRes.end(payload != null ? String(payload) : '');
    }
  };
}

function runApiHandler(apiPath, req, res, body) {
  return (async () => {
    try {
      req.body = body ? JSON.parse(body) : {};
      const modulePath = join(process.cwd(), 'api', apiPath);
      // Add timestamp to bust Node.js module cache on every request in dev
      const mod = await import(pathToFileURL(modulePath).href + `?t=${Date.now()}`);
      const handler = mod.default;
      const wrappedRes = createWrappedRes(res);
      await handler(req, wrappedRes);
    } catch (e) {
      console.error(`API ${apiPath} error:`, e)
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'API failed', message: e?.message || String(e) }))
    }
  })()
}

/** In dev, handle POST /api/publish-content-local, POST /api/import-content-from-git, GET /api/git-history, chat JWT bridge. */
function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathOnly = req.url?.split('?')[0] || '';
        const isGitHistory = req.method === 'GET' && req.url?.startsWith('/api/git-history');
        if (isGitHistory) {
          runApiHandler('git-history.js', req, res, '');
          return;
        }
        const isChatJwt =
          pathOnly === '/api/chat-supabase-jwt' && (req.method === 'POST' || req.method === 'OPTIONS');
        if (isChatJwt) {
          if (req.method === 'OPTIONS') {
            runApiHandler('chat-supabase-jwt.js', req, res, '');
            return;
          }
          let jwtBody = '';
          req.on('data', (chunk) => {
            jwtBody += chunk;
          });
          req.on('end', () => {
            runApiHandler('chat-supabase-jwt.js', req, res, jwtBody);
          });
          return;
        }
        const isPublish = req.method === 'POST' && req.url?.startsWith('/api/publish-content-local');
        const isImport = req.method === 'POST' && req.url?.startsWith('/api/import-content-from-git');
        if (!isPublish && !isImport) return next()
        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', () => {
          if (isPublish) runApiHandler('publish-content-local.js', req, res, body)
          else runApiHandler('import-content-from-git.js', req, res, body)
        })
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  // Load .env* into process.env so API handlers (git-history, etc.) can read GITHUB_* in dev.
  // Do not let empty values from committed .env.* placeholders wipe CI/Vercel-injected secrets.
  const fromFiles = loadEnv(mode, process.cwd(), '')
  const shellSnapshot = { ...process.env }
  Object.assign(process.env, fromFiles)
  for (const key of Object.keys(fromFiles)) {
    const fileVal = fromFiles[key]
    const fileEmpty = fileVal == null || String(fileVal).trim() === ''
    const shellVal = shellSnapshot[key]
    const hadShell = shellVal != null && String(shellVal).trim() !== ''
    if (fileEmpty && hadShell) process.env[key] = shellVal
  }

  const viteAdminApiSecret = String(process.env.VITE_ADMIN_API_SECRET || '').trim()

  return {
    define: {
      // Same source as import.meta.env.VITE_ADMIN_API_SECRET; Rolldown inlines
      // this literal at build time (avoids env replacement missing lazy chunks).
      __TBDSM_VITE_ADMIN_API_SECRET__: JSON.stringify(viteAdminApiSecret)
    },
    plugins: [
      localApiPlugin(),
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globIgnores: ['**/version.json'],
          // Default 2 MiB; main chunk can exceed that (e.g. Quill) and would fail the build.
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        },
        manifest: {
          name: 'מדברים BDSM',
          short_name: 'TBDSM',
          description: 'מדברים BDSM - קהילה, אירועים, הרשמה למסיבות וסדנאות. Talking BDSM - community, events, party registration and workshops.',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          orientation: 'any',
          prefer_related_applications: false,
          icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
            { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
          ],
        },
      }),
    ],
    build: {
      outDir: 'dist',
      // Tighter chunk-warning bound now that vendors are split out below.
      chunkSizeWarningLimit: 800,
      rolldownOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          // Vendor chunks — order matters (first match wins). Replaces deprecated
          // manualChunks; keeps cache-friendly splits for heavy libraries.
          codeSplitting: {
            groups: [
              { name: 'vendor-firebase', test: /node_modules[/\\]firebase/ },
              { name: 'vendor-quill', test: /node_modules[/\\]quill/ },
              { name: 'vendor-katex', test: /node_modules[/\\]katex/ },
              { name: 'vendor-xlsx', test: /node_modules[/\\]xlsx/ },
              { name: 'vendor-dompurify', test: /node_modules[/\\]dompurify/ },
              { name: 'vendor-bcrypt', test: /node_modules[/\\]bcryptjs/ },
              { name: 'vendor-router', test: /node_modules[/\\]react-router/ },
              { name: 'vendor-helmet', test: /node_modules[/\\]react-helmet/ },
              { name: 'vendor-icons', test: /node_modules[/\\](lucide-react|react-icons)/ },
              { name: 'vendor-react', test: /node_modules[/\\](react-dom|react[/\\]|scheduler[/\\])/ },
              { name: 'vendor', test: /node_modules/ },
            ],
          },
        }
      }
    },
    // Prevent caching in development
    server: {
      host: '127.0.0.1', // IPv4 only – can fix ERR_CONNECTION_TIMED_OUT on Windows
      port: 3000,
      strictPort: false,
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  }
})

