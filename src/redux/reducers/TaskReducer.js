import { actions } from "../actions/TaskAction";

// This is reducer for todo tasks managing
const TaskReducer = (state = [], action) => {
  switch (action?.type) {
    case actions.LOAD_TASKS:
      return action.payload;

    case actions.ADD_TASK: {
      return [
        {
          title: action.payload,
          isDone: false,
        },
        ...state,
      ];
    }

    case actions.REMOVE_TASK: {
      return state.filter((task) => task.title !== action.payload);
    }

    case actions.UPDATE_TASK: {
      const { title, newStatus } = action.payload;
      return state.map((task) => {
        if (task.title === title) {
          task.isDone = newStatus;
        }
        return task;
      });
    }

    default:
      return state;
  }
};

export default TaskReducer;
