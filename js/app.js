const switchBtnActive = document.getElementById('switchBtnActive');
const switchBtnCompleted = document.getElementById('switchBtnCompleted');
const taskEl = document.querySelectorAll('.task--wrapper');
const modalOverlays = document.querySelectorAll('.overlay');
const modalCloseBtns = document.querySelectorAll('.closeModal');
const addTaskModalBtn = document.getElementById('addTaskModalBtn'); //Display Modal Only
const addTaskModal = document.getElementById('addTaskModal');
const addTaskForm = document.getElementById('addTaskForm'); //Adds Task to the List
const activeTaskList = document.getElementById('activeTaskList');
const completedTaskList = document.getElementById('completedTaskList');
const viewTaskModal = document.getElementById('viewTaskModal');
const TASK_ACTIVE = 'active';
const TASK_COMPLETED = 'completed';
// Toggles Tasks on Mobile Devices
const toggleTask = () => {
  if (window.matchMedia('(max-width: 600px)').matches) {
    //Only if on Mobile Devices
    toggleTaskButtons();
    toggleTaskContent();
  }
};

const toggleTaskButtons = () => {
  document.querySelector('.taskSwitches--wrapper').classList.toggle('slide');
  setTimeout(() => {
    switchBtnCompleted.classList.toggle('active');
    switchBtnActive.classList.toggle('active');
  }, 200); //Delays Task Button Animation
};

const toggleTaskContent = () => {
  //Toggle Tasks on Mobile Devices
  taskEl.forEach((el) => {
    el.classList.toggle('shift');
  });
};

const showAddTaskModal = () => {
  //Display "Add Task Modal"
  addTaskModal.style.display = 'block';
};

const hideAddTaskModal = () => {
  //Display "Add Task Modal"
  addTaskModal.style.display = 'none';
};

const closeModal = function () {
  const currentModal = this.closest('.modal');
  currentModal.style.display = 'none';
};

const showError = (element) => {
  element.nextElementSibling.style.display = 'block';
  setTimeout(() => {
    element.nextElementSibling.style.display = 'none';
  }, 2000);
};

const addTaskToList = (e) => {
  e.preventDefault();
  const taskNameEl = document.getElementById('taskName');
  const taskName = taskNameEl.value;
  const taskInfoEl = document.getElementById('taskInfo');
  const taskInfo = taskInfoEl.value;
  if (taskName == '') {
    showError(taskNameEl); //Display Error Message Next to the Element
    return;
  }
  if (taskInfo == '') {
    showError(taskInfoEl); //Display Error Message Next to the Element
    return;
  }
  const newTask = new createTask(taskName, 'active', taskInfo);
  newTask.storeTask();
  newTask.updatedUI();

  hideAddTaskModal();
  taskNameEl.value = ''; //Empty Name Input Value
  taskInfoEl.value = ''; //Empty Info Input Value
};

switchBtnActive.addEventListener('click', toggleTask);
switchBtnCompleted.addEventListener('click', toggleTask);
addTaskModalBtn.addEventListener('click', showAddTaskModal);
addTaskForm.addEventListener('submit', addTaskToList);

for (modalOverlay of modalOverlays) {
  modalOverlay.addEventListener('click', closeModal);
}

for (modalCloseBtn of modalCloseBtns) {
  modalCloseBtn.addEventListener('click', closeModal);
}

const setDefaultTasks = () => {
  //If app executes first time, set default data(Tasks)
  if (!localStorage.getItem('allTasks')) {
    let setDefaultTasks = {
      tasks: [
        {
          taskName: 'House Cleaning',
          taskStatus: 'active',
          taskID: 1,
          taskInfo: 'I have to clean the whole house today till 10AM',
        },
        {
          taskName: 'GitHub Project',
          taskStatus: 'completed',
          taskID: 2,
          taskInfo: 'I have completed MyToDo Project on GitHub',
        },
      ],
    };
    localStorage.setItem('allTasks', JSON.stringify(setDefaultTasks));
  }
};

const loadTasks = () => {
  //Loads Tasks from Local Storage at Initial Execution
  storedTasks = JSON.parse(localStorage.getItem('allTasks'));
  for (task of storedTasks.tasks) {
    let newTask = new createTask(
      task.taskName,
      task.taskStatus,
      task.taskInfo,
      task.taskID
    );
    newTask.updatedUI();
  }
};

class createTask {
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

    viewTaskModal.querySelector('#viewTaskContent').innerHTML = '';
    viewTaskModal.querySelector('#viewTaskContent').appendChild(setViewTask);
    viewTaskModal.querySelector('#viewTaskContent').appendChild(setStatusBtn);
    viewTaskModal.style.display = 'block';
  }

  deleteTask(e, isMove = false) {
    this.taskEl.remove();
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
      viewTaskModal.style.display = 'none';
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
}

class App {
  static init() {
    setDefaultTasks();
    loadTasks();
  }
}

App.init();
