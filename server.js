import Fastify from 'fastify'

var counter = 0;

const fastify = Fastify({
    logger: true
})

fastify.all('/callback', function (request, reply) {
    counter++;
    reply.send(counter);
})

fastify.get('/', function (request, reply) {
    reply.send(counter);
})

fastify.listen({ port: 8080 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
