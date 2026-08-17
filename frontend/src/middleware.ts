import 'dotenv/config';
import { type UserAuthorisationResult } from '@i-dot-ai-npm/utilities';
import { parseAuthToken } from './auth';

interface RedirectContext {
  redirect: (path: string) => Response;
}

interface Session {
  get(key: string): Promise<string | undefined>;
  set(key: string, value: string): void;
  destroy(): void;
}

interface RequestContext {
  request: Request;
  session: Session;
  redirect: (path: string) => Response;
}

// Define paths that should be public (no authorisation required)
const PUBLIC_PATHS = [
  '/favicon.svg',
  '/fonts/',
  '/unauthorised',
  '/api/health',
  '/generic-error',
  '/sign-out',
];

export async function onRequest(context: RequestContext, next: () => Promise<Response>): Promise<Response> {
  const pathname: string = new URL(context.request.url).pathname;

  // Check if the requested path is public
  if (PUBLIC_PATHS.some((path: string) => pathname.startsWith(path))) {
    return next();
  }

  try {
    let authResult: UserAuthorisationResult | null = null;

    if(process.env.ENVIRONMENT !== 'local') {
      const token = context.request.headers.get('x-amzn-oidc-data');

      if (!token) {
        console.error(`No auth token found in headers when accessing ${pathname}`);
        return redirectToUnauthorised(context);
      }

      authResult = await parseAuthToken(token);
    } else {
      authResult = {
        email: "test@i.ai.gov.uk",
        isAuthorised: true,
        authReason: "LOCAL_TESTING"
      }
    }

    if (authResult?.isAuthorised !== true) {
      if (authResult?.authReason === 'TOKEN_EXPIRED') {
        return redirectToSignOut(context);
      }
      console.error(`User is not authorised to access ${pathname}`);
      return redirectToUnauthorised(context);
    }

    const { email } = authResult;

    // If the current user doesn't match the user for the session, destroy existing session data - it may be a shared device
    const storedUserEmail: string | undefined = await context.session.get('user-email');
    if (storedUserEmail !== email) {
      context.session.destroy();
      context.session.set('user-email', email);
    }

    return next();
  } catch(error: unknown) {
    console.error('Error authorising token:', error);
    return redirectToGenericError(context);
  }
}

function redirectToUnauthorised(context: RedirectContext): Response {
  return context.redirect('/unauthorised');
}

function redirectToSignOut(context: RedirectContext): Response {
  return context.redirect('/sign-out');
}

function redirectToGenericError(context) {
  return context.redirect('/generic-error');
}
