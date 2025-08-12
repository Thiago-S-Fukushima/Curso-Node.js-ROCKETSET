import fastify from 'fastify'
import crypto from 'node:crypto'

const server = fastify({
    logger: {transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    }}
})

const courses = [
    {id: '1', tittle: 'Curso de React' },
    {id: '2', tittle: 'Curso de Java' },
    {id: '3', tittle: 'Curso de Html' },
]

server.get('/courses', () => {
    return { courses }
});

server.get('/courses/:id', (request, reply) => {
type Params = {
    id:string
}
    const params = request.params as Params
    const courseID = params.id

    const course = courses.find(course => course.id === courseID)

    if(course) {
        return { course }
    } 

    return reply.status(404).send()
})

server.post('/courses', (request, reply) => {

    type Body = {
        tittle: string
    }

    const courseId = crypto.randomUUID()
    const body = request.body as Body
    const courseTittle = body.tittle

    if (!courseTittle) {
        return reply.status(400).send({ message: 'Titulo Obrigatório' })
    }

    courses.push({id: courseId, tittle: courseTittle})

    return reply.status(201).send({ courseId })
})

server.listen({ port: 5533}).then(() => {
    console.log('HTTP conectado na porta:5533');
})
