import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Next.js 16: `middleware.ts` is deprecated, renamed to `proxy.ts`.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ['/admin/:path*'],
};
