import * as element from './DOMHelper.js';
const TASK_ACTIVE = 'active';
const TASK_COMPLETED = 'completed';
export class createTask {
  constructor(name, status, info, id = false) {
    this.taskEl;
    this.taskName = name;
    this.taskStatus = status;
    this.taskInfo = info;
    this.taskID = id || Math.random() + 1;
  }

  storeTask() {
    let storedTasks;
    if (localStorage.getItem('allTasks')) {
      storedTasks = JSON.parse(localStorage.getItem('allTasks'));
    } else {
      storedTasks = { tasks: [] };
    }
    storedTasks.tasks.push({
      taskName: this.taskName,
      taskStatus: this.taskStatus,
      taskID: this.taskID,
      taskInfo: this.taskInfo,
    });
    localStorage.setItem('allTasks', JSON.stringify(storedTasks));
  }

  updatedUI() {
    this.taskEl = document.createElement('div');
    if (this.taskStatus == TASK_ACTIVE) {
      this.taskEl.classList.add('task--content', TASK_ACTIVE);
    } else {
      this.taskEl.classList.add('task--content', TASK_COMPLETED);
    }
    const taskTemplate = `
          <span>${this.taskName}</span>
          <div class="actions">
            <button class="button small">View Task</button>
            <button class="button small danger">Delete</button>
          </div>`;
    this.taskEl.innerHTML = taskTemplate;
    let viewTaskBtn = this.taskEl.querySelector('button:first-of-type');
    viewTaskBtn.addEventListener('click', this.viewTask.bind(this));

    let deleteTaskBtn = this.taskEl.querySelector('button:last-of-type');
    deleteTaskBtn.addEventListener('click', this.deleteTask.bind(this));
    if (this.taskStatus == TASK_ACTIVE) {
      activeTaskList.insertAdjacentElement('beforeend', this.taskEl);
    } else {
      completedTaskList.insertAdjacentElement('beforeend', this.taskEl);
    }
    createTask.checkEmpty(this.taskStatus);
  }

  viewTask() {
    let setViewTask = document.createElement('div');
    let viewTaskTemplate = `
      <span class="tag ${this.taskStatus}">${this.taskStatus} Task</span>
      <span class="title text-primary ${this.taskStatus}">${this.taskName}</span>
      <p class="info">${this.taskInfo}</p>
      `;
    let setStatusBtn = document.createElement('button');
    if (this.taskStatus == TASK_ACTIVE) {
      setStatusBtn.classList.add('button', 'danger');
      setStatusBtn.textContent = 'Set Task Completed';
    } else {
      setStatusBtn.classList.add('button');
      setStatusBtn.textContent = 'Set Task Active';
    }
    setStatusBtn.addEventListener('click', this.deleteTask.bind(this, true)); // Delete and Move
    setViewTask.innerHTML = viewTaskTemplate;

    element.viewTaskModal.querySelector('#viewTaskContent').innerHTML = '';
    element.viewTaskModal
      .querySelector('#viewTaskContent')
      .appendChild(setViewTask);
    element.viewTaskModal
      .querySelector('#viewTaskContent')
      .appendChild(setStatusBtn);
    element.viewTaskModal.style.display = 'block';
  }

  deleteTask(e, isMove = false) {
    this.taskEl.remove();
    createTask.checkEmpty(this.taskStatus);
    let storedTasks = JSON.parse(localStorage.getItem('allTasks'));
    if (storedTasks) {
      storedTasks.tasks.splice(
        storedTasks.tasks.findIndex((task) => task.taskID == this.taskID),
        1
      );
      localStorage.setItem('allTasks', JSON.stringify(storedTasks));
    }
    if (isMove) {
      //Toggles Task Status i.e; Active/Completed
      element.viewTaskModal.style.display = 'none';
      this.taskStatus =
        this.taskStatus == TASK_COMPLETED ? TASK_ACTIVE : TASK_COMPLETED;
      const moveTask = new createTask(
        this.taskName,
        this.taskStatus,
        this.taskInfo,
        this.taskID
      );
      moveTask.storeTask();
      moveTask.updatedUI();
    }
  }

  static checkEmpty(taskList) {
    //Checks if Task List is Empty then Display related Message
    if (taskList == TASK_ACTIVE) {
      if (element.activeTaskList.querySelector('.task--content') == null) {
        element.activeTaskList.querySelector('.empty').style.display = 'block';
      } else {
        element.activeTaskList.querySelector('.empty').style.display = 'none';
      }
    } else {
      if (element.completedTaskList.querySelector('.task--content') == null) {
        element.completedTaskList.querySelector('.empty').style.display =
          'block';
      } else {
        element.completedTaskList.querySelector('.empty').style.display =
          'none';
      }
    }
  }
}
