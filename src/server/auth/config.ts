import axios from "axios";
import { Session, User, DefaultSession, NextAuthConfig, JWT } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AtlassianProvider from "next-auth/providers/atlassian";
import { baseUrl, Collection, Doc, Endpoint, Workspace } from "@/model";
import { JWT as J } from "next-auth/jwt";
// import { cookies } from "next/headers";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
    token: JWT;
  }

  interface User {
    expires: Date,
    workspaceId: number,
    organizationId: number,
    oAuthProviders: OAuthProvider[],
    hasPassword: boolean,
  }

  interface JWT extends J {
    workspaces:Workspace[],
    activeWorkspace: Workspace
    activeCollection: Collection
    activeEndpoint: Endpoint
    activeDocument: Doc,
    docs: Doc[]
  }
}

type OAuthProvider = 'google' | 'github' | 'atlassian';

type OAuthResponse = {
  user: User,
  token: string,
  workspaces: Workspace[],
  oAuthProviders: OAuthProvider[],
  hasPassword: boolean,
  docs: Doc[]
}

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AtlassianProvider({
      clientId: process.env.BITBUCKET_CLIENT_ID,
      clientSecret: process.env.BITBUCKET_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, user, credentials, email, profile }) {
      if (!credentials) {
        try {
          const payload = {
            name: user.name,
            email: user.email,
            image: user.image,
            oauthProvider: account?.provider,
            oauthProviderAccountId: account?.providerAccountId
          }
  
          const workspaces = await axios.post(baseUrl + '/account/oauth', payload)
          .then((res) => {
            const data = res.data as OAuthResponse;
            user.id = data.user?.id;
            user.oAuthProviders = data.oAuthProviders
            user.hasPassword = data.hasPassword;
            user.organizationId = data.workspaces[0]?.organizationId!;
            user.workspaceId = data.workspaces[0]?.id!
            
            return data.workspaces;
          });

          // user.workspaces = workspaces;

          return true;
        } catch (error) {
          console.error('Error during sign-in process:', error);
          return false; // Prevent sign-in on error
        }
        }

      return false;
    },

    async session({ session, token } : {session: Session, token: JWT}) : Promise<Session> {
      // Assign the fetched properties from token into session
      if (token) {
        session.user.id = token?.id + '';
        session.user.name = token.name || '';
        session.user.email = token.email || '';
        session.user.image = token.image + '';
        session.user.oAuthProviders = token.oAuthProviders as ('google' | 'github' | 'atlassian')[];
        // session.user.organizationId = token.workspaces[0]?.organizationId!;
        // session.user.workspaceId = token.workspaces[0]?.id!
            
      }
      return session; // Return the updated session
    },

    async jwt({ token, user } : { token: J, user: User} ) : Promise<JWT> {
      let composedToken = token as JWT;

      if (user) {
          // Set user properties on the token when the user is first signed in
          composedToken.id = user?.id;
          composedToken.name = user.name; // Store user's name
          composedToken.email = user.email; // Store user's email
          composedToken.image = user.image; // Store user's image
          composedToken.oAuthProviders = user.oAuthProviders;
          composedToken.organizationId = user.organizationId;
          composedToken.workspaceId = user.workspaceId
            
      }
      return composedToken; // Return the updated token
  }
}
};