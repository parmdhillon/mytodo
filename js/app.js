const switchBtnActive = document.getElementById('switchBtnActive');
const switchBtnCompleted = document.getElementById('switchBtnCompleted');
const taskEl = document.querySelectorAll('.task--wrapper');
const modalOverlays = document.querySelectorAll('.overlay');
const modalCloseBtns = document.querySelectorAll('.closeModal');
const addTaskModalBtn = document.getElementById('addTaskModalBtn'); //Display Modal Only
const addTaskModal = document.getElementById('addTaskModal');
const addTaskForm = document.getElementById('addTaskForm'); //Adds Task to the List
const activeTaskList = document.getElementById('activeTaskList');

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
  const taskEl = document.createElement('div');
  taskEl.classList.add('task--content', 'active');
  const taskTemplate = `
      <span>${taskName}</span>
      <div class="actions">
        <button class="button small">View Task</button>
        <button class="button small danger">Delete</button>
      </div>`;
  taskEl.innerHTML = taskTemplate;
  activeTaskList.insertAdjacentElement('beforeend', taskEl);
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
