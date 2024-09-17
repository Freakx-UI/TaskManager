let taskList = [];

document.querySelector('.add-task-btn').addEventListener('click', () => {
    openInputConatainer();
});
document.querySelector('.persist').addEventListener('click', () => {

});
document.querySelector('.input-data-button').addEventListener('click', () => {
    addTask();
});



function openInputConatainer() {
    document.querySelector('.input-data-container').classList.remove('hide-input-container');
}
renderHTMl(taskList);


function addTask() {
    const inputName = document.querySelector('.input-name');
    const name = inputName.value;

    const inputDescription = document.querySelector('.input-description');
    const description = inputDescription.value;
    document.querySelector('.input-data-container').classList.add('hide-input-container');

    if (name === '' || description === '') {
        alert('Please insert name and description');
        return;
    }
    taskList.push({
        name,
        description,
        id: taskList.length + 1,
        stage: 'todo'
    })
    inputName.value = '';
    inputDescription.value = '';

    renderHTMl();

}

function deleteTask() {
    document.querySelectorAll('.delete-task-button').forEach((button) => {
        button.addEventListener('click', () => {
            taskList.splice(button.dataset.index, 1);
            renderHTMl();

        });
    });

}

function forwardTask() {
    document.querySelectorAll('.move-forward').forEach((button) => {
        button.addEventListener('click', () => {
            const taskId = parseInt(button.dataset.taskId);
            const task = taskList.find(task => task.id === taskId);

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
};

function moveToOnhold() {
    document.querySelectorAll('.move-pause').forEach((button) => {
        button.addEventListener('click', () => {
            const taskId = parseInt(button.dataset.taskId);
            const task = taskList.find(task => task.id === taskId);
            if (task) {
                task.stage = 'onhold';
                renderHTMl();
            }
        });
    });
}

function backwardTask() {
    document.querySelectorAll('.move-backward ').forEach((button) => {
        button.addEventListener('click', () => {
            const taskId = parseInt(button.dataset.taskId);
            const task = taskList.find(task => task.id === taskId);
            if (task) {
                task.stage = 'inprogress';
                renderHTMl();
            }
        });
    });
}
renderHTMl();