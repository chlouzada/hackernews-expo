import { createTRPCReact } from '@trpc/react';
import type { AppRouter } from '@chlou/hn-trpc';
export const trpc = createTRPCReact<AppRouter>();
