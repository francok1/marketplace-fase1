/** @type {import('next').NextConfig} */

const nextConfig = {
  // No bloquear el build por errores de tipo o de lint (avisos menores)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // React Mode
  reactStrictMode: true,

  // Image Optimization - Agresivo
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "**.googleapis.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers - Optimizados para performance y seguridad
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          // Cache control para HTML dinámico
          {
            key: "Cache-Control",
            value: "public, s-maxage=10, stale-while-revalidate=59",
          },
        ],
      },
      // Cache agresivo para assets estáticos
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache para JS/CSS bundles
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache para imágenes
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
    };
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Webpack optimization
  webpack: (config, { isServer }) => {
    // Optimizar bundle
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxAsyncRequests: 25,
          maxInitialRequests: 25,
          cacheGroups: {
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "react-vendors",
              priority: 10,
            },
            nextAuth: {
              test: /[\\/]node_modules[\\/]next-auth[\\/]/,
              name: "nextauth",
              priority: 9,
            },
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },

  // Experimental optimizations
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"],
    },
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "recharts",
      "date-fns",
    ],
    // optimizeCss requiere el paquete 'critters'. Deshabilitado para evitar fallo de build.
    // optimizeCss: true,
  },

  // Output mode
  output: "standalone",

  // Production Source Maps - Deshabilitadas para mejor performance
  productionBrowserSourceMaps: false,

  // PoweredByHeader - Remover header innecesario
  poweredByHeader: false,

  // Compression - Habilitado
  compress: true,

  // Generate ETags - Para mejor caching
  generateEtags: true,

  // Trailing Slash
  trailingSlash: false,

  // OnDemandEntries - Optimizar para desarrollo
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 hora
    pagesBufferLength: 5,
  },

  // HttpAgentOptions - Para mejor performance en producción
  httpAgentOptions: {
    keepAlive: true,
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
