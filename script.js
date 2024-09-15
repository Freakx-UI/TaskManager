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
renderHTMl();

function renderHTMl() {

    let todoHTMl = '';
    let inprogressHTMl = '';
    let onholdHTMl = '';
    let doneHTML = '';
    let html;

    taskList.forEach((task, index) => {

        html += `
        <div class="task-container">
            <div class="title-and-buttons">
                <div class="name">${task.name}</div>
                <div>
                    <button class="move-forward task-buttons" data-task-stage="${task.stage}">
                        <i class="fa-solid fa-forward"></i></button>
                    <button class="delete-task-button task-buttons delete-button"
                     data-task-id="${task.id} data-task-index="${index}">
                        <i class="fa-solid fa-trash"></i></button></div>
            </div>
            <div class="description">${task.description}</div>
        </div>
    `;
        if (task.stage === 'todo') {
            todoHTMl = html;
        } else if (task.stage === 'inprogress') {
            inprogressHTMl = html;
        } else if (task.stage === 'onhold') {
            onhold = html;
        } else if (task.stage === 'done') {
            doneHTML = html;
        }

    });
    document.querySelector('.to-do-container').innerHTML = todoHTMl;
    document.querySelector('.in-progress-container ').innerHTML = inprogressHTMl;
    document.querySelector('.on-hold-container').innerHTML = onholdHTMl;
    document.querySelector('.done-container').innerHTML = doneHTML;
    deleteTask();
    forwardTask();
}

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
            console.log(button.dataset.taskStage)
            currentStage = button.dataset.taskStage;
            if (currentStage === 'todo') {
                currentStage = ' inprogress';
            }
            renderHTMl();

        });
    });

}