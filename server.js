import Fastify from 'fastify'
import fastify_postgres_plugin from '@fastify/postgres'
import { readFile } from 'fs/promises'

const port = 8080
const host = '0.0.0.0'
const demo_items = JSON.parse(await readFile('./demo_items.json'))

const fastify = Fastify({
    logger: true
})

fastify.get('/', function (request, reply) {
    reply.redirect('/paymants')
})

fastify.post('/callback', function (request, reply) {
    const { id, status, amount } = request.body;
    fastify.pg.connect(onConnect)

    function onConnect (err, client, release) {
        if (err) return reply.send(err)

        client.query(
            'INSERT INTO public.payments(id, status, amount) VALUES ($1, $2, $3);', 
            [id, status, amount],
        function onResult (err) {
            release()
            reply.send(err || { success: true })
        }
        )
    }
})

fastify.get('/paymants', function (request, reply) {
    fastify.pg.connect(onConnect)
    
    function onConnect (err, client, release) {
        if (err) return reply.send(err)

        client.query(
            'SELECT id, status, amount FROM public.payments', [],
        function onResult (err, result) {
            release()
            reply.send(err || result.rows)
        }
        )
    }
})

fastify.get('/items', function (request, reply) {
    reply.send(demo_items)
})

fastify.register(fastify_postgres_plugin, {
    connectionString: 'postgres://postgres:secret@postgres/postgres'
})

fastify.listen({ port, host }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
