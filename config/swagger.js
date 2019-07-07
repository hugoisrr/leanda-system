exports.options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'LeanDA API',
        description: 'REST API with Node.js, MongoDB, Fastify and Swagger. Used for the Android App of LeanDA',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  }