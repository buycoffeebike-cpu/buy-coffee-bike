import { NextResponse } from 'next/server';

// Canadians who open a US /start page are sent to the Canadian version (CA$ prices), query string intact, so one ad
// can serve both countries (founder, 30 Sept 2026: "US receives US page and Canada receives Canada page").
// Country: Cloudflare fronts coffeebike.ca and sends the visitor's country as cf-ipcountry (the reliable one here,
// since Vercel otherwise sees Cloudflare's address); Vercel's own geo lookup is the fallback. A local build has
// neither header, so nothing redirects there unless one is set by hand. Only the /start pages are touched: the main
// sales page and everything else pass straight through.
const BASE = '/buy-a-mobile-coffee-bike';

export function middleware(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return NextResponse.next();
  const country = (request.headers.get('cf-ipcountry') || request.geo?.country || request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  if (country !== 'CA') return NextResponse.next();
  const url = request.nextUrl.clone();
  const hadBase = url.pathname.startsWith(BASE);
  const path = hadBase ? url.pathname.slice(BASE.length) : url.pathname;
  if (!/^\/start(\/|$)/.test(path) || /^\/start\/ca(\/|$)/.test(path)) return NextResponse.next();
  const canadian = path.replace(/^\/start/, '/start/ca');
  url.pathname = hadBase ? `${BASE}${canadian}` : canadian;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/start', '/start/:path*', '/buy-a-mobile-coffee-bike/start', '/buy-a-mobile-coffee-bike/start/:path*'],
};
