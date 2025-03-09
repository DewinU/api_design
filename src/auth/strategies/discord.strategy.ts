import { Request } from 'express'
import { Strategy } from 'passport-oauth2'
import { envs } from '../../config/envs'

class DiscordStrategy extends Strategy {
  constructor() {
    super(
      {
        clientID: envs.discord.id,
        clientSecret: envs.discord.secret,
        callbackURL: '/auth/discord/cb',
        authorizationURL: 'https://discord.com/oauth2/authorize',
        tokenURL: 'https://discord.com/api/oauth2/token',
        scope: ['email', 'identify', 'guilds'],
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
      const response = await fetch('https://discord.com/api/users/@me', {
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
      prompt: 'none',
      access_type: 'offline',
    }
  }
}

const discordStrategy = new DiscordStrategy()

export default discordStrategy
