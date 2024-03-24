import Fastify from 'fastify';
import { createLinks } from './routes/create-links';
import { getLinks } from './routes/get-links';
import { getCode } from './routes/get-code';
const app = Fastify();


app.register(createLinks)
app.register(getLinks)
app.register(getCode)

app.listen({
    host: '0.0.0.0',
    port: 3333,

}).then(() =>{
    console.log('listening on port 3333')
})