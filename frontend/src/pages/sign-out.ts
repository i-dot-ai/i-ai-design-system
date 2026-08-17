import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies, redirect }) => {
  const clientId = process.env.OIDC_CLIENT_ID || '';
  if (!clientId) {
    console.error('OIDC_CLIENT_ID environment variable is not set');
  }

  cookies.delete('X-Amzn-Oidc-Data-0', { path: '/' });
  cookies.delete('AWSALBAuthNonce', { path: '/' });

  const ssoSignOutUrl = `https://sso.service.security.gov.uk/sign-out?to_client=${encodeURIComponent(clientId)}`;
  return redirect(ssoSignOutUrl, 302);
};
