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

const addTaskToList = (e) => {
  e.preventDefault();
  const taskNameEl = document.getElementById('taskName');
  const taskName = taskNameEl.value;
  if (taskName == '') {
    taskNameEl.nextElementSibling.style.display = 'block'; //Display Error Message
    return;
  }
  const newTask = new createTask(taskName, 'active', 'TEMP');
  newTask.storeTask();
  newTask.updatedUI();

  hideAddTaskModal();
  taskNameEl.value = '';
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

const deleteTask = function (id, elem) {
  elem.remove();
  let storedTasks = JSON.parse(localStorage.getItem('allTasks'));
  if (storedTasks) {
    storedTasks.tasks.splice(
      storedTasks.tasks.findIndex((task) => task.taskID == id),
      1
    );
    localStorage.setItem('allTasks', JSON.stringify(storedTasks));
  }
};

const setDefaultTasks = () => {
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
    const taskEl = document.createElement('div');
    const TASK_ACTIVE = 'active';
    const TASK_COMPLETED = 'completed';
    if (this.taskStatus == TASK_ACTIVE) {
      taskEl.classList.add('task--content', TASK_ACTIVE);
    } else {
      taskEl.classList.add('task--content', TASK_COMPLETED);
    }
    const taskTemplate = `
        <span>${this.taskName}</span>
        <div class="actions">
          <button class="button small">View Task</button>
          <button class="button small danger">Delete</button>
        </div>`;
    taskEl.innerHTML = taskTemplate;
    let viewTaskBtn = taskEl.querySelector('button:first-of-type');
    let deleteTaskBtn = taskEl.querySelector('button:last-of-type');
    deleteTaskBtn.addEventListener(
      'click',
      deleteTask.bind(this, this.taskID, taskEl)
    );
    if (this.taskStatus == TASK_ACTIVE) {
      activeTaskList.insertAdjacentElement('beforeend', taskEl);
    } else {
      completedTaskList.insertAdjacentElement('beforeend', taskEl);
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
