const Filter = {
    openFilter() {
        document.querySelector('.filter-btn').addEventListener('click', () => {
            let element = document.querySelector('.filter-date');
            if (element.style.display === "none" || element.style.display === "") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
                this.createFiltredList();
            }



        });
    },

    createFiltredList() {
        const inputDate = document.querySelector('.filter-date');
        const date = inputDate.value;

        document.querySelectorAll('.task-container').forEach((e) => {
            let date = e.dataset.taskDate
        });
        if (date === '') {
            alert('Insert date')
        } else {
            const filtredTaskList = TaskList.taskItem.filter((tasks) => {
                return tasks.date === date;
            });
            renderHTMl(filtredTaskList);
            let delBtn = document.querySelector('.delete-filter-btn');
            if (delBtn.style.display === "none" || delBtn.style.display === "") {
                delBtn.style.display = "block";
            } else {
                delBtn.style.display = "none";
            }
        }
    }


}
document.querySelector('.delete-filter-btn').addEventListener('click', () => {
    renderHTMl(TaskList.taskItem);
    document.querySelector('.delete-filter-btn').style.display = "none";

});