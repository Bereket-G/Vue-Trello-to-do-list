import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3000/api/',
    json: true
});

export default {
        async execute (method, resource, data) {

            return client({
                method,
                url: resource,
                data
            }).then(req => {
                return req.data
            })
        },
        getTaskLists () {
            return this.execute('get', `/TaskLists/`);
        },
        getTodoListsOfTask (taskId) {
            return this.execute('get', `/TaskLists/` + taskId +`/todos` )
        },
        createTask (data) {
            return this.execute('post', '/Todos', data)
        },
        updateTask (id, data) {
            return this.execute('put', `/Todos/${id}`, data)
        },
        deleteTask (id) {
            return this.execute('delete', `/Todos/${id}`)
        }
}
