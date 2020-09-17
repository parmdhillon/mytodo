const switchBtnActive = document.getElementById('switchBtnActive');
const switchBtnCompleted = document.getElementById('switchBtnCompleted');
const taskEl = document.querySelectorAll('.task--wrapper');

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

switchBtnActive.addEventListener('click', toggleTask);
switchBtnCompleted.addEventListener('click', toggleTask);
