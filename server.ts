import fastify from 'fastify'
import crypto from 'node:crypto'

const server = fastify()

const courses = [
    {id: 1, tile: 'Curso de node.js'},
    {id: 2, tile: 'Curso de React'},
    {id: 3, tile: 'Curso de Java'},
]

server.get('/courses', () => {
    return {courses}
})

server.get('/courses/:id', (request, reply) => {
    const courseId = request.params.id
    const course = courses.find(course => course.id === courseId)

    if (course) {
        return {course}
    }
})

server.post('/courses', () => {
    const coursesId = crypto.randomUUID()
    const courseTitle = request.body.tittle

    if(!courseTitle) {
     return reply.status(404).send()   
    }

    courses.push({id: crypto.randomUUID(), title: 'NOVO curso'})
})