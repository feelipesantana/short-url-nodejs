import Fastify from 'fastify';

const app = Fastify();


app.listen({
    host: '0.0.0.0',
    port: 3333,

}).then(() =>{
    console.log('listening on port 3333')
})