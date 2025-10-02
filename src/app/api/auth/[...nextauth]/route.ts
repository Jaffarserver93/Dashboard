import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const botToken = process.env.DISCORD_BOT_TOKEN!;
const guildId = process.env.DISCORD_GUILD_ID!;

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify guilds.join' } },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'discord' && account.access_token) {
        try {
          const userId = user.id;
          const accessToken = account.access_token;
          
          const response = await fetch(
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

          if (response.ok) {
            console.log(`Successfully added user ${userId} to guild ${guildId}`);
          } else {
             // It might be a 204 if user is already in guild, which is also ok.
            if (response.status !== 204) {
                const errorData = await response.json();
                console.error(`Failed to add user to guild: ${response.status}`, errorData);
                // Decide if you want to block sign-in if guild join fails
                // return false; 
            } else {
                 console.log(`User ${userId} is already a member of guild ${guildId}`);
            }
          }
        } catch (error) {
          console.error('Error trying to add user to guild:', error);
          // return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
