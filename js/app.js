import * as element from './App/DOMHelper.js';
import { setDefaultTasks } from './Utility/setDefaultData.js';
import { createTask } from './App/tasksManager.js';
const TASK_ACTIVE = 'active';
const TASK_COMPLETED = 'completed';
const toggleTask = () => {
  // Toggles Tasks on Mobile Devices
  if (window.matchMedia('(max-width: 600px)').matches) {
    toggleTaskButtons();
    toggleTaskContent();
  }
};

const toggleTaskButtons = () => {
  document.querySelector('.taskSwitches--wrapper').classList.toggle('slide');
  setTimeout(() => {
    element.switchBtnCompleted.classList.toggle('active');
    element.switchBtnActive.classList.toggle('active');
  }, 200);
};

const toggleTaskContent = () => {
  //Toggle Tasks on Mobile Devices
  element.taskEl.forEach((el) => {
    el.classList.toggle('shift');
  });
};

const showAddTaskModal = () => {
  //Display "Add Task Modal"
  element.addTaskModal.style.display = 'block';
};

const hideAddTaskModal = () => {
  //Display "Add Task Modal"
  element.addTaskModal.style.display = 'none';
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

element.switchBtnActive.addEventListener('click', toggleTask);
element.switchBtnCompleted.addEventListener('click', toggleTask);
element.addTaskModalBtn.addEventListener('click', showAddTaskModal);
element.addTaskForm.addEventListener('submit', addTaskToList);

for (let modalOverlay of element.modalOverlays) {
  modalOverlay.addEventListener('click', closeModal);
}

for (let modalCloseBtn of element.modalCloseBtns) {
  modalCloseBtn.addEventListener('click', closeModal);
}

const loadTasks = () => {
  //Loads Tasks from Local Storage at Initial Execution
  const storedTasks = JSON.parse(localStorage.getItem('allTasks'));
  for (let task of storedTasks.tasks) {
    let newTask = new createTask(
      task.taskName,
      task.taskStatus,
      task.taskInfo,
      task.taskID
    );
    newTask.updatedUI();
  }
  createTask.checkEmpty(TASK_COMPLETED);
  createTask.checkEmpty(TASK_ACTIVE);
};

class App {
  static init() {
    setDefaultTasks();
    loadTasks();
  }
}

App.init();
