function renderHTMl() {
    const listOfTask = TaskList.taskItem;
    let todoHTMl = '';
    let inprogressHTMl = '';
    let onholdHTMl = '';
    let doneHTML = '';
    let html = '';

    listOfTask.forEach((task, index) => {
        console.log(listOfTask);
        let buttonsHtml = '';

        if (task.stage === 'todo') {
            buttonsHtml = `
                    <button class="move-forward task-buttons" data-task-id="${task.id}">
                        <i class="fa-solid fa-forward"></i></button>
                    <button class="delete-task-button task-buttons" data-task-id="${task.id}">
                        <i class="fa-solid fa-trash"></i></button>`
        } else if (task.stage === 'inprogress') {
            buttonsHtml = `
                    <button class="move-pause task-buttons" data-task-id="${task.id}">
                        <i class="fa-solid fa-pause"></i></button>
                    <button class="move-forward task-buttons" data-task-id="${task.id}">
                        <i class="fa-solid fa-check"></i></button>
                    <button class="delete-task-button task-buttons" data-task-id="${task.id}">
                        <i class="fa-solid fa-trash"></i></button>
                `
        } else if (task.stage === 'onhold') {
            buttonsHtml = `
                    <button class="move-backward task-buttons" data-task-id="${task.id}">
                        <i class="fa-solid fa-backward"></i></button>
                    <button class="delete-task-button task-buttons" data-task-id="${task.id}">
                        <i class="fa-solid fa-trash"></i></button>
                `
        } else if (task.stage === 'done') {
            buttonsHtml = `
                    <button class="delete-task-button task-buttons" data-task-id="${task.id}">
                        <i class="fa-solid fa-trash"></i></button>
                `
        };

        const html = `
        <div class="task-container" draggable="true" data-task-id="${task.id}">
            <div class="title-and-buttons">
                <div class="name">${task.name}</div>
                <div>
                    ${buttonsHtml}
                </div>
            </div>
            <div class="description">${task.description.replaceAll("\n", "<br>")}</div>
        </div>
    `;
        if (task.stage === 'todo') {
            todoHTMl += html;
        } else if (task.stage === 'inprogress') {
            inprogressHTMl += html;
        } else if (task.stage === 'onhold') {
            onholdHTMl += html;
        } else if (task.stage === 'done') {
            doneHTML += html;
            document.querySelector('.done-container').classList.add('tittle-line-through');
        }

    });
    document.querySelector('.to-do-container').innerHTML = todoHTMl;
    document.querySelector('.in-progress-container ').innerHTML = inprogressHTMl;
    document.querySelector('.on-hold-container').innerHTML = onholdHTMl;
    document.querySelector('.done-container').innerHTML = doneHTML;

    applyDragAndDrop();
    TaskList.deleteTask();
    TaskList.forwardTask();
    TaskList.moveToOnhold();
    TaskList.backwardTask();
}

function applyDragAndDrop() {
    console.log('this is drag and drop');
    const taskContainers = document.querySelectorAll('.task-container');
    const stageContainer = document.querySelectorAll('.stage-containers');

    taskContainers.forEach(task => {
        task.addEventListener('dragstart', handleDragStart);

    });

    stageContainer.forEach(task => {
        task.addEventListener('dragover', handleDragOver);
        task.addEventListener('drop', handleDrop);

    });
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
    document.querySelectorAll('.stage-containers').forEach(el => {
        el.classList.add('drag-border-show');
    });
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const task = TaskList.taskItem.find(task => task.id == taskId);
    const taskClass = event.target.classList;
    document.querySelectorAll('.stage-containers').forEach(el => {
        el.classList.remove('drag-border-show');
    });

    if (task) {
        if (taskClass.contains('to-do-container')) {
            task.stage = 'todo';
        } else if (taskClass.contains('in-progress-container')) {
            task.stage = 'inprogress';
        } else if (taskClass.contains('on-hold-container')) {
            task.stage = 'onhold';
        } else if (taskClass.contains('done-container')) {
            task.stage = 'done';
        }

        renderHTMl();
    }
}