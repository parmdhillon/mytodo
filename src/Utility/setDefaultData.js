export const setDefaultTasks = () => {
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
          taskID: 2,
          taskName: 'GitHub Project',
          taskStatus: 'completed',
          taskInfo: 'I have completed MyToDo Project on GitHub',
        },
      ],
    };
    localStorage.setItem('allTasks', JSON.stringify(setDefaultTasks));
  }
};
