import { Strategy } from 'passport-oauth2'

class TiktokStrategy extends Strategy {
  constructor() {
    super(
      {
        clientID: process.env.AUTH_TIKTOK_CLIENT_ID!,
        clientSecret: process.env.AUTH_TIKTOK_CLIENT_SECRET!,
        callbackURL: '/auth/tiktok/cb',
        authorizationURL: 'https://www.tiktok.com/v2/auth/authorize',
        tokenURL: 'https://open.tiktokapis.com/v2/oauth/token',
        scope: ['user.info.profile'],
      },
      function (accessToken, refreshToken, profile, done) {
        // In a real application, you would use the profile information to find or create a user in your database
        // For now, we'll just return the profile
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        // console.log('profile', profile)
        return done(null, profile)
      },
    )
  }
  async userProfile(
    accessToken: string,
    done: (err?: unknown, profile?: any) => void,
  ): Promise<void> {
    try {
      const response = await fetch(
        'https://open.tiktokapis.com/v2/user/info/?fields=open_id,avatar_url,display_name,username',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      const json = await response.json()
      done(null, json)
    } catch (e) {
      done(e)
    }
  }

  authorizationParams(options: any): object {
    return {
      client_key: process.env.AUTH_TIKTOK_CLIENT_ID!,
      prompt: 'none',
      access_type: 'offline',
    }
  }

  tokenParams(options: any): object {
    return {
      client_key: process.env.AUTH_TIKTOK_CLIENT_ID!,
    }
  }
}

const tiktokStrategy = new TiktokStrategy()
export default tiktokStrategy
