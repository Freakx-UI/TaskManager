const TaskList = {
    taskItem: [],
    editingTaskId: null,

    loadFromStorage(localStoragekey) {
        this.taskItem = JSON.parse(localStorage.getItem(localStoragekey));
        if (!this.taskItem) {
            this.taskItem = [];
        }
    },
    saveToStorage(localStoragekey, data) {
        localStorage.setItem(localStoragekey, JSON.stringify(data));
    },

    openATaskModule() {
        document.querySelector('.input-data-container').classList.remove('hide-input-container');
        const inputButton = document.querySelector('.input-data-button');
        inputButton.textContent = this.editingTaskId ? 'Edit Task' : 'Add Task';
    },


    addTask() {
        const inputName = document.querySelector('.input-name');
        const name = inputName.value;

        const inputDate = document.querySelector('.input-date');
        const date = inputDate.value;

        const inputDescription = document.querySelector('.input-description');
        const description = inputDescription.value;

        document.querySelector('.input-data-button').addEventListener('click', () => {
            console.log('click');
        });
        document.querySelector('.input-data-container').classList.add('hide-input-container');

        if (name === '' || description === '') {
            alert('Please insert name and description');
            return;
        }
        if (this.editingTaskId) {
            const task = this.taskItem.find(task => task.id === this.editingTaskId);
            task.name = name;
            task.date = date;
            task.description = description;
            this.editingTaskId = null;
        } else {
            this.taskItem.push({
                name,
                date,
                description,
                id: this.taskItem.length + 1,
                stage: 'todo'
            });
        }
        inputName.value = '';
        inputDescription.value = '';
        inputDate.value = '';

        renderHTMl();
    },

    deleteTask() {
        document.querySelectorAll('.delete-task-button').forEach((button) => {
            button.addEventListener('click', () => {
                const index = this.taskItem.findIndex(task => task.id === parseInt(button.dataset.taskId));
                this.taskItem.splice(index, 1);
                renderHTMl();
            });
        });
    },

    deleteAllTask(localStoragekey) {
        document.querySelector('.delete-all-button').addEventListener('click', () => {
            this.taskItem = [];
            this.saveToStorage(localStoragekey, this.taskItem);
            renderHTMl();
            console.log(this.taskItem);
        });
    },

    forwardTask() {
        document.querySelectorAll('.move-forward').forEach((button) => {
            button.addEventListener('click', () => {
                const taskId = parseInt(button.dataset.taskId);
                const task = this.taskItem.find(task => task.id === taskId);

                if (task) {
                    switch (task.stage) {
                        case 'todo':
                            task.stage = 'inprogress';
                            break;
                        case 'inprogress':
                            task.stage = 'done';
                            break;
                    }
                }
                renderHTMl();
            });
        });
    },

    moveToOnhold() {
        document.querySelectorAll('.move-pause').forEach((button) => {
            button.addEventListener('click', () => {
                const taskId = parseInt(button.dataset.taskId);
                const task = this.taskItem.find(task => task.id === taskId);
                if (task) {
                    task.stage = 'onhold';
                    renderHTMl();
                }
            });
        });
    },

    backwardTask() {
        document.querySelectorAll('.move-backward ').forEach((button) => {
            button.addEventListener('click', () => {
                const taskId = parseInt(button.dataset.taskId);
                const task = this.taskItem.find(task => task.id === taskId);
                if (task) {
                    task.stage = 'inprogress';
                    renderHTMl();
                }
            });
        });
    },

    editTask() {
        document.querySelectorAll('.edit-btn').forEach((button) => {
            button.addEventListener('click', () => {
                const taskId = parseInt(button.dataset.taskId);
                const task = this.taskItem.find(task => task.id === taskId);

                const inputName = document.querySelector('.input-name');
                inputName.value = task.name;

                const inputDate = document.querySelector('.input-date');
                inputDate.value = task.date;

                const inputDescription = document.querySelector('.input-description');
                inputDescription.value = task.description;

                this.editingTaskId = taskId;

                this.openATaskModule();
            });
        });
    }
};

document.querySelector('.add-task-btn').addEventListener('click', () => TaskList.openATaskModule());

document.querySelector('.add-new-task').addEventListener('click', () => TaskList.addTask());

document.querySelector('.input-data-button').addEventListener('click', () => TaskList.deleteAllTask('tasks'));

document.querySelector('.persist-btn').addEventListener('click', () => TaskList.saveToStorage('tasks', TaskList.taskItem));


TaskList.deleteAllTask('tasks');
TaskList.loadFromStorage('tasks');
renderHTMl();