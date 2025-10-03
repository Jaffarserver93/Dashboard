import LoginPage from "./login/page";

export default function Home() {
  const showVerification = process.env.CLOUDFLARE_ENABLED === 'true';

  if (showVerification) {
    // The verification dialog logic will be here if you want to re-enable it.
    // For now, we are disabling it as requested. In a real scenario,
    // you would conditionally render the VerificationDialog or the LoginPage.
  }
  
  return <LoginPage />;
}
