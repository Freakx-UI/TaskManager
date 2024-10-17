const DragAndDrop = {
    applyDragAndDrop() {
        const taskContainers = document.querySelectorAll('.task-container');
        const stageContainer = document.querySelectorAll('.stage-containers');

        taskContainers.forEach(task => {
                task.addEventListener('dragstart', this.handleDragStart);

            }),


            stageContainer.forEach(task => {
                task.addEventListener('dragover', this.handleDragOver);
                task.addEventListener('drop', this.handleDrop);

            })
    },

    handleDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.taskId);
        document.querySelectorAll('.stage-containers').forEach(el => {
            el.classList.add('drag-border-show');
        })
    },

    handleDragOver(event) {
        event.preventDefault();
    },

    handleDrop(event) {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('text/plain');
        const task = TaskList.taskItem.find(task => task.id == taskId);
        const taskClass = event.target.classList;
        document.querySelectorAll('.stage-containers').forEach(el => {
            el.classList.remove('drag-border-show');
        })
        if (task) {
            if (task.stage === 'done') {
                alert('You cant move task from this stage');
                return;
            }
        }

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

            renderHTMl(this.taskItem);
        }
    }
}