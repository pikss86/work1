import Fastify from 'fastify'
import { readFile } from 'fs/promises';

const port = 8080
const host = '0.0.0.0'
const invoices = []
const demo_items = JSON.parse(await readFile('./demo_items.json'))

const fastify = Fastify({
    logger: true
})

fastify.get('/', function (request, reply) {
    reply.redirect('/invoices')
})

fastify.post('/callback', function (request, reply) {
    invoices.push(request.body)
    reply.send({ success: true })
})

fastify.get('/invoices', function (request, reply) {
    reply.send(invoices)
})

fastify.get('/items', function (request, reply) {
    reply.send(demo_items)
})

fastify.listen({ port, host }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
