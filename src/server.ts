import Fastify from 'fastify';
import { createLinks } from './routes/create-links';
import { getLinks } from './routes/get-links';
const app = Fastify();


app.register(createLinks)
app.register(getLinks)

app.listen({
    host: '0.0.0.0',
    port: 3333,

}).then(() =>{
    console.log('listening on port 3333')
})