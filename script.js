const TaskList = {

    taskItem: [],

    loadFromStorage(localStoragekey) {
        this.taskItem = JSON.parse(localStorage.getItem(localStoragekey))
        if (!this.taskItem) {
            this.taskItem = [];
        }
    },
    saveToStorage(localStoragekey, data) {
        localStorage.setItem(localStoragekey, JSON.stringify(data))
    },


    openATaskModule() {
        document.querySelector('.input-data-container').classList.remove('hide-input-container');
    },

    addTask() {
        const inputName = document.querySelector('.input-name');
        const name = inputName.value;

        const inputDescription = document.querySelector('.input-description');
        const description = inputDescription.value;
        document.querySelector('.input-data-container').classList.add('hide-input-container');

        if (name === '' || description === '') {
            alert('Please insert name and description');
            return;
        }
        this.taskItem.push({
            name,
            description,
            id: this.taskItem.length + 1,
            stage: 'todo'
        })
        inputName.value = '';
        inputDescription.value = '';

        renderHTMl();
    },

    deleteTask() {
        document.querySelectorAll('.delete-task-button').forEach((button) => {
            button.addEventListener('click', () => {
                this.taskItem.splice(button.dataset.index, 1);
                renderHTMl();
            });
        });
    },
    deleteAllTask(localStoragekey) {
        document.querySelector('.delete-all-button').addEventListener('click', () => {
            this.taskItem = [];
            TaskList.saveToStorage('tasks', this.taskItem)

            renderHTMl();
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
    }



}


renderHTMl();
document.querySelector('.add-task-btn').addEventListener('click', () => {
    TaskList.openATaskModule();
});

document.querySelector('.persist').addEventListener('click', () => {
    console.log(TaskList.saveToStorage('tasks', TaskList.taskItem));
});


document.querySelector('.input-data-button').addEventListener('click', () => {
    TaskList.addTask();
});

TaskList.loadFromStorage('tasks');
TaskList.deleteAllTask('tasks');
renderHTMl();