import 'dotenv/config'
import swaggerAutogen from 'swagger-autogen'
import { envs } from './src/config/envs'

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Swagger Demo Project',
    description: 'Implementation of Swagger with TypeScript',
  },
  servers: [
    {
      url: `http://localhost:${envs.port}`,
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
}

const outputFile = './src/swagger-output.json'
const routes = ['./src/server.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc)
