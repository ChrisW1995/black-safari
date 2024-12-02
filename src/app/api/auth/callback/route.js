// app/api/auth/callback/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.AZURE_CLIENT_ID,
        scope: 'https://graph.microsoft.com/Mail.Send',
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
        client_secret: process.env.AZURE_CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    // 在實際應用中，您應該安全地存儲這些令牌
    console.log('Access Token:', tokenData.access_token);
    console.log('Refresh Token:', tokenData.refresh_token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json({ error: 'Token exchange failed' }, { status: 500 });
  }
}