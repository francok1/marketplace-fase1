import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Proteger rutas de dashboard
    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      !req.nextauth.token
    ) {
      return NextResponse.redirect(
        new URL(
          `/auth/signin?callbackUrl=${req.nextUrl.pathname}`,
          req.url
        )
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permitir acceso a rutas públicas
        if (req.nextUrl.pathname.startsWith("/auth")) {
          return true;
        }

        // Requerir autenticación para dashboard
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
