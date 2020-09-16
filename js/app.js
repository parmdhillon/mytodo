const switchBtnActive = document.getElementById('switchBtnActive');
const switchBtnCompleted = document.getElementById('switchBtnCompleted');

// Toggles Tasks on Mobile Devices
const toggleTask = () => {
  if (window.matchMedia('(max-width: 600px)').matches) {
    document.querySelector('.taskSwitches--wrapper').classList.toggle('slide');
    setTimeout(() => {
      switchBtnCompleted.classList.toggle('active');
      switchBtnActive.classList.toggle('active');
    }, 200); //Toggle Task Button Animation
  }
};

switchBtnActive.addEventListener('click', toggleTask);
switchBtnCompleted.addEventListener('click', toggleTask);
