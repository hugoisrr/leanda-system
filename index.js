// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
  })
const mongoose = require('mongoose')
const routes = require('./routes')
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

 //db connection
// mongoose.connect('mongodb://localhost:27017/multivac', function (err){
  mongoose.connect('mongodb://root:hNia4rvqYXmX@127.0.0.1:27017/admin', { useNewUrlParser: true }, function (err){
    mongoose.Promise = global.Promise;
    if(err){
        console.log("not connected to mongodb: " +err);
    } else {
        console.log("connected to mongodb")

    }
});
  
routes.forEach((route, index) => {
    console.log("i get a request");
    fastify.route(route)
})

  // Declare a route
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
  
  // Run the server!
  const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`listening on ${fastify.server.address().port}`)
    } catch (err) {
      console.log("api err");
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()