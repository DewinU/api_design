import passport from 'passport'
import githubStrategy from './github.strategy'
import googleStrategy from './google.strategy'
import discordStrategy from './discord.strategy'
import tiktokStrategy from './tiktok.strategy'

const auth = new passport.Passport()

auth.use('github', githubStrategy)
auth.use('google', googleStrategy)
auth.use('discord', discordStrategy)
auth.use('tiktok', tiktokStrategy)

export default auth
