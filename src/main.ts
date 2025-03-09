import { envs } from './config/envs'
import app from './server'
const PORT = envs.port

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`)
})
