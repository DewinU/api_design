import { Request } from 'express'
import { Strategy } from 'passport-oauth2'
import { envs } from '../../config/envs'

// // Define the GitHub OAuth2 strategy
// const githubStrategy = new Strategy(
//   {
//     clientID: process.env.AUTH_GITHUB_CLIENT_ID!,
//     clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
//     callbackURL: '/auth/cb/github',
//     authorizationURL: 'https://github.com/login/oauth/authorize',
//     tokenURL: 'https://github.com/login/oauth/access_token',
//     scope: ['read:user'],
//   },
//   function (accessToken, refreshToken, profile, done) {
//     // In a real application, you would use the profile information to find or create a user in your database
//     // For now, we'll just return the profile
//     console.log('accessToken', accessToken)
//     console.log('refreshToken', refreshToken)
//     console.log('profile', profile)
//     return done(null, profile)
//   },
// )

// export default githubStrategy

class GithubStrategy extends Strategy {
  constructor() {
    super(
      {
        clientID: envs.github.id,
        clientSecret: envs.github.secret,
        callbackURL: '/auth/github/cb',
        authorizationURL: 'https://github.com/login/oauth/authorize',
        tokenURL: 'https://github.com/login/oauth/access_token',
        scope: ['read:user'],
      },
      function (accessToken, refreshToken, profile, done) {
        // In a real application, you would use the profile information to find or create a user in your database
        // For now, we'll just return the profile
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        console.log('profile', profile)
        return done(null, profile)
      },
    )
  }
  async userProfile(
    accessToken: string,
    done: (err?: unknown, profile?: any) => void,
  ): Promise<void> {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const json = await response.json()
      done(null, json)
    } catch (e) {
      done(e)
    }
  }

  authorizationParams(options: any): object {
    return {
      promt: 'none',
      access_type: 'offline',
    }
  }
}

const githubStrategy = new GithubStrategy()

export default githubStrategy
