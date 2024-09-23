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
        <div class="task-container">
            <div class="title-and-buttons">
                <div class="name">${task.name}</div>
                <div>
                    ${buttonsHtml}
                </div>
            </div>
            <div class="description">${task.description}</div>
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
    TaskList.deleteTask();
    TaskList.forwardTask();
    TaskList.moveToOnhold();
    TaskList.backwardTask();
}