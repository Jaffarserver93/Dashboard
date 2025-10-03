'use server';

import { headers } from 'next/headers';

export async function verifyTurnstile(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    return { success: false, message: 'Turnstile secret key is not configured.' };
  }

  const verificationUrl = 'https://challenges.cloudflare.com/api/turnstile/v1/siteverify';
  
  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);

  // Add remote IP to the request, but make it optional
  const ip = headers().get('x-forwarded-for') ?? headers().get('cf-connecting-ip');
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
      return { success: false, message: `Verification failed: ${data['error-codes']?.join(', ') || 'Unknown error'}` };
    }
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return { success: false, message: 'An error occurred during verification.' };
  }
}
