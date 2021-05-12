import { createServer, Model } from 'miragejs'

type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})
        },

        routes() {
            this.namespace = 'api';
            // hold 700ms as delay
            this.timing = 750;

            this.get('/users')
            this.post('/users')

            // reset the global namespace
            this.namespace = ''
            this.passthrough()
        }
    })

    return server;
}