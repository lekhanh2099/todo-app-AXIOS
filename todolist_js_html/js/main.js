
function getEl(el) {
    return document.querySelector(el);
};




var serviceTasks = new RequestServiceTask();

var validations = new Valitation();

function getListTask() {
    getEl('#loader').style.display = 'block';
    serviceTasks
        .getTask()
        .then(function (result) {
            let dataList = result.data;
            createListTask(dataList);
            getEl('#loader').style.display = 'none';

        })
        .catch(function (err) { console.log(err);
        });
};

getListTask();

// Hiện thị danh sách task

function createListTask(listTask) {
    let contentTodo = '';
    let contentDone = '';
    for (key in listTask) {
        if (listTask[key].status === 'todo') {
            contentTodo +=
                `
            <li class="">
                <span>${listTask[key].tasks}</span>
                <div class="">
                    <button class="btn-del" onclick="deleteTask('${listTask[key].id}')"><i class="fas fa-minus-circle"></i></button>
                    <button class="btn-done" onclick="doneTask('${listTask[key].id}')"><i class="fas fa-check-circle"></i></button>
                </div>
            </li>
            `;
            getEl('#todo').innerHTML = contentTodo;
        };
        if (listTask[key].status === 'completed') {
            contentDone +=
                `
            <li class="">
                <span>${listTask[key].tasks}</span>
                <div class="">
                    <button class="btn-del" onclick="deleteTask('${listTask[key].id}')"><i class="fas fa-minus-circle"></i></button>
                </div>
            </li>
            `;
            getEl('#completed').innerHTML = contentDone;
        };
    };
};


function getValueInput() {
    let valueNewTask = getEl('#newTask').value;
    let emptyValid = true;
    emptyValid &= validations.empty(valueNewTask, 'Todo empty');
    if (emptyValid) {
        let newTask = new Tasks('', valueNewTask, 'todo');
        getEl('#newTask').value = '';
        return newTask;
    };
    return null;
};

getEl('#addItem').addEventListener('click', function () {
    getEl('#loader').style.display = 'block';
    let newTask = getValueInput();
    let existVal = true;
    serviceTasks
        .getTask()
        .then(function (_result) {
            getEl('#loader').style.display = 'none';
            let dataList = _result.data;
            existVal &= validations.checkTask(newTask.tasks, dataList, 'Already exist');
            if (existVal) {
                serviceTasks
                    .postTask(newTask)
                    .then(function (_result) {
                        getListTask();
                    })
                    .catch(function (err) { console.log(err); });
            };
        })
        .catch(function (err) { console.log(err); })
});

function deleteTask(id) {
    getEl('#loader').style.display = 'block';
    serviceTasks
        .deleteTask(id)
        .then(function (_result) {
            getEl('#loader').style.display = 'none';
            getListTask();
        })
        .catch(function (err) { console.log(err); });

};

function doneTask(id) {
    getEl('#loader').style.display = 'block';
    serviceTasks
        .getTaskCompleted(id)
        .then(function (_result) {
            getEl('#loader').style.display = 'none';
            var taskList = _result.data;
            taskList.status = 'completed';
            serviceTasks
                .putTask(id, taskList)
                .then(function (_result) {
                    getListTask();
                })
                .catch(function (err) { console.log(err); })
        })
        .catch(function (err) { console.log(err); });
};


