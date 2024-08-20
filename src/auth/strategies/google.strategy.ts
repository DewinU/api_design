import OAuth2Strategy from 'passport-oauth2'

class GoogleStrategy extends OAuth2Strategy {
  constructor() {
    super(
      {
        clientID: process.env.AUTH_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
        callbackURL: '/auth/google/cb',
        authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenURL: 'https://oauth2.googleapis.com/token',
        scope: ['profile', 'email'],
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
        'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
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
      access_type: 'offline',
      include_granted_scopes: 'true',
    }
  }
}

const googleStrategy = new GoogleStrategy()
export default googleStrategy
