// app/api/contact/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, phone, message, to } = await req.json();

    // 使用 refresh token 獲取新的 access token
    const tokenResponse = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.AZURE_CLIENT_ID,
        client_secret: process.env.AZURE_CLIENT_SECRET,
        refresh_token: process.env.MS_REFRESH_TOKEN,
        grant_type: 'refresh_token',
        scope: 'https://graph.microsoft.com/Mail.Send',
      }),
    });

    const { access_token } = await tokenResponse.json();

    // 使用 Microsoft Graph API 發送郵件
    const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          subject: `新しいお問い合わせ: ${name}様より`,
          body: {
            contentType: 'HTML',
            content: `
              <h2>新しいお問い合わせが届きました</h2>
              <p><strong>お名前:</strong> ${name}</p>
              <p><strong>メールアドレス:</strong> ${email}</p>
              <p><strong>電話番号:</strong> ${phone || 'なし'}</p>
              <h3>メッセージ:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            `
          },
          toRecipients: [
            {
              emailAddress: {
                address: to
              }
            }
          ]
        }
      })
    });

    if (!graphResponse.ok) {
      const errorData = await graphResponse.json();
      throw new Error(errorData.error?.message || 'Failed to send email');
    }

    return NextResponse.json({ message: '送信が完了しました' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { message: 'エラーが発生しました', error: error.message },
      { status: 500 }
    );
  }
}