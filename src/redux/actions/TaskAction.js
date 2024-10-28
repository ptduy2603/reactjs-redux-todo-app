export const actions = {
  LOAD_TASKS: "LOAD_TASKS",
  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
};

// redux-thunk allow us to create actions that return a function instead of an plain object with type and payload
// Inside the function we can do many things such as call APIs to fetch data or check conditions before deciding to move actions to reducers
export const addTaskAction = (newTask) => (dispatch, getState) => {
  const { Todo: tasks } = getState();

  // check if the newTask is existing in the state of tasks
  // if true do not add newTask in tasks
  const isExistingTask = !!tasks.find((item) => item.title === newTask);

  if (!isExistingTask) {
    dispatch({
      type: actions.ADD_TASK,
      payload: newTask,
    });
  }
};

export const removeTaskAction = (task) => (dispatch, getState) => {
  const { Todo: tasks } = getState();
  const isExistingTask = !!tasks.find((item) => item.title === task);
  if (isExistingTask) {
    dispatch({
      type: actions.REMOVE_TASK,
      payload: task,
    });
  }
};

export const updateTaskStatus = (task) => (dispatch, getState) => {
  const { Todo: tasks } = getState();
  const { title } = task;

  const isExistingTask = !!tasks.find((item) => item.title === title);

  if (isExistingTask) {
    dispatch({
      type: actions.UPDATE_TASK,
      payload: task,
    });
  }
};

export const loadTasks = (tasks) => ({
  type: actions.LOAD_TASKS,
  payload: tasks,
});
