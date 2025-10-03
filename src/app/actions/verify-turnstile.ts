'use server';

import { headers } from 'next/headers';

export async function verifyTurnstile(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // This is a server-side configuration error, should not happen in production
    console.error('Turnstile secret key is not configured.');
    return { success: false, message: 'The server is missing its Turnstile configuration.' };
  }

  const verificationUrl = 'https://challenges.cloudflare.com/api/turnstile/v1/siteverify';
  
  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);

  // The remote IP is a recommended parameter, but let's make it optional and safe.
  const ip = headers().get('cf-connecting-ip') ?? headers().get('x-forwarded-for');
  if (ip) {
    formData.append('remoteip', ip);
  }

  try {
    const response = await fetch(verificationUrl, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, message: 'Verification successful!' };
    } else {
      // Log the specific error codes from Cloudflare for easier debugging
      console.error('Turnstile verification failed:', data['error-codes']);
      return { success: false, message: `Verification failed. Please try again. [${data['error-codes']?.join(', ') || 'Unknown'}]` };
    }
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return { success: false, message: 'An error occurred during verification.' };
  }
}
