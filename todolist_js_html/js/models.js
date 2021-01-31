function RequestServiceTask() {
    this.getTask = function () {
        return axios({
            url: 'https://6006de173698a80017de221c.mockapi.io/api/todo-app',
            method: 'GET',
        });
    };
    this.postTask = function (task) {
        return axios({
            url: 'https://6006de173698a80017de221c.mockapi.io/api/todo-app',
            method: 'POST',
            data: task,
        });
    };
    this.deleteTask = function (id) {
        return axios({
            url: `https://6006de173698a80017de221c.mockapi.io/api/todo-app/${id}`,
            method: 'DELETE',
        });
    };
    this.getTaskCompleted = function (id) {
        return axios({
            url: `https://6006de173698a80017de221c.mockapi.io/api/todo-app/${id}`,
            method: 'GET',
        });
    };
    this.putTask = function (id, task) {
        return axios({
            url: `https://6006de173698a80017de221c.mockapi.io/api/todo-app/${id}`,
            method: 'PUT',
            data: task
        });
    };
};