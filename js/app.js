const switchBtnActive = document.getElementById('switchBtnActive');
const switchBtnCompleted = document.getElementById('switchBtnCompleted');

// Toggles Tasks on Mobile Devices
const toggleTask = () => {
  switchBtnCompleted.classList.toggle('active');
  switchBtnActive.classList.toggle('active');
};

switchBtnActive.addEventListener('click', toggleTask);
switchBtnCompleted.addEventListener('click', toggleTask);
