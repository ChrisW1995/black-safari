import { NextResponse } from 'next/server';

export async function GET(req) {
  const authUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
  const params = new URLSearchParams({
    client_id: process.env.AZURE_CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.REDIRECT_URI,
    response_mode: 'query',
    scope: 'offline_access https://graph.microsoft.com/Mail.Send',
    prompt: 'consent'
  });

  return NextResponse.redirect(`${authUrl}?${params.toString()}`);
}