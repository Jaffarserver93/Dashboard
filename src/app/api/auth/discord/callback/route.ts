import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=NoCode', req.url));
  }

  const clientId = process.env.DISCORD_CLIENT_ID!;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET!;
  const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!;
  const botToken = process.env.DISCORD_BOT_TOKEN!;
  const guildId = process.env.DISCORD_GUILD_ID!;

  try {
    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Error fetching token:', tokenData);
      return NextResponse.redirect(
        new URL(`/login?error=${tokenData.error_description || 'TokenError'}`, req.url)
      );
    }

    const accessToken = tokenData.access_token;

    // 2. Get user info
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userResponse.json();

    if (!userResponse.ok) {
      console.error('Error fetching user:', userData);
      return NextResponse.redirect(
        new URL(`/login?error=${userData.message || 'UserFetchError'}`, req.url)
      );
    }

    const userId = userData.id;

    // 3. Add user to guild with bot
    const guildJoinResponse = await fetch(
      `https://discord.com/api/guilds/${guildId}/members/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${botToken}`,
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      }
    );

    // If user is already in the guild, Discord returns 204 No Content, which is fine.
    // If the user was successfully added, Discord returns 201 Created.
    if (guildJoinResponse.status !== 201 && guildJoinResponse.status !== 204) {
      const guildJoinData = await guildJoinResponse.json();
      console.error('Error joining guild:', guildJoinData);
      // We can still redirect to dashboard even if guild join fails
    }

    // 4. Redirect to dashboard
    const dashboardUrl = new URL('/dashboard', req.url);
    
    const response = NextResponse.redirect(dashboardUrl);

    // You might want to set a session cookie here to keep the user logged in
    // For simplicity, we are just redirecting.
    // Example: response.cookies.set('session', accessToken, { httpOnly: true, secure: true, path: '/' });
    
    return response;

  } catch (error) {
    console.error('Callback error:', error);
    let errorMessage = 'CallbackError';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.redirect(new URL(`/login?error=${errorMessage}`, req.url));
  }
}
