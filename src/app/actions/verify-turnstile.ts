'use server';

export async function verifyTurnstile(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      'TURNSTILE_SECRET_KEY is not set in environment variables.'
    );
  }

  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);
  // You can also pass the user's IP address
  // formData.append('remoteip', ip);

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log('Turnstile verification successful:', data);
      return { success: true, message: 'You have been successfully verified.' };
    } else {
      console.error('Turnstile verification failed:', data['error-codes']);
      return {
        success: false,
        message: `Verification failed. Please try again. Error: ${data[
          'error-codes'
        ]?.join(', ')}`,
      };
    }
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    throw new Error('Server error during verification.');
  }
}
