const TaskList = {
    taskItem: [],

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
        });
        inputName.value = '';
        inputDescription.value = '';

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
    }
};

// function renderHTMl() {
//     const listOfTask = TaskList.taskItem;
//     let todoHTMl = '';
//     let inprogressHTMl = '';
//     let onholdHTMl = '';
//     let doneHTML = '';
//     let html = '';

//     listOfTask.forEach((task, index) => {
//         console.log(listOfTask);
//         let buttonsHtml = '';

//         if (task.stage === 'todo') {
//             buttonsHtml = `
//                     <button class="move-forward task-buttons" data-task-id="${task.id}">
//                         <i class="fa-solid fa-forward"></i></button>
//                     <button class="delete-task-button task-buttons" data-task-id="${task.id}">
//                         <i class="fa-solid fa-trash"></i></button>`
//         } else if (task.stage === 'inprogress') {
//             buttonsHtml = `
//                     <button class="move-pause task-buttons" data-task-id="${task.id}">
//                         <i class="fa-solid fa-pause"></i></button>
//                     <button class="move-forward task-buttons" data-task-id="${task.id}">
//                         <i class="fa-solid fa-check"></i></button>
//                     <button class="delete-task-button task-buttons" data-task-id="${task.id}">
//                         <i class="fa-solid fa-trash"></i></button>
//                 `
//         } else if (task.stage === 'onhold') {
//             buttonsHtml = `
//                     <button class="move-backward task-buttons" data-task-id="${task.id}">
//                         <i class="fa-solid fa-backward"></i></button>
//                     <button class="delete-task-button task-buttons" data-task-id="${task.id}">
//                         <i class="fa-solid fa-trash"></i></button>
//                 `
//         } else if (task.stage === 'done') {
//             buttonsHtml = `
//                     <button class="delete-task-button task-buttons" data-task-id="${task.id}">
//                         <i class="fa-solid fa-trash"></i></button>
//                 `
//         };

//         const html = `
//         <div class="task-container">
//             <div class="title-and-buttons">
//                 <div class="name">${task.name}</div>
//                 <div>
//                     ${buttonsHtml}
//                 </div>
//             </div>
//             <div class="description">${task.description}</div>
//         </div>
//     `;
//         if (task.stage === 'todo') {
//             todoHTMl += html;
//         } else if (task.stage === 'inprogress') {
//             inprogressHTMl += html;
//         } else if (task.stage === 'onhold') {
//             onholdHTMl += html;
//         } else if (task.stage === 'done') {
//             doneHTML += html;
//             document.querySelector('.done-container').classList.add('tittle-line-through');
//         }

//     });
//     document.querySelector('.to-do-container').innerHTML = todoHTMl;
//     document.querySelector('.in-progress-container ').innerHTML = inprogressHTMl;
//     document.querySelector('.on-hold-container').innerHTML = onholdHTMl;
//     document.querySelector('.done-container').innerHTML = doneHTML;

//     applyDragAndDrop();
//     TaskList.deleteTask();
//     TaskList.forwardTask();
//     TaskList.moveToOnhold();
//     TaskList.backwardTask();
// }




document.querySelector('.add-task-btn')
    .addEventListener('click', () => TaskList.openATaskModule());

document.querySelector('.input-data-button').addEventListener('click', () => TaskList.addTask());

document.querySelector('.input-data-button').addEventListener('click', () => TaskList.deleteAllTask('tasks'));

TaskList.loadFromStorage('tasks');
renderHTMl();