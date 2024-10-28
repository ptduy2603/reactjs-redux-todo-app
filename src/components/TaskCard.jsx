import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  removeTaskAction,
  updateTaskStatus,
} from "../redux/actions/TaskAction";

function TaskCard({ id, title, isCompleted }) {
  const dispatch = useDispatch();

  const handleRemoveTask = () => {
    dispatch(removeTaskAction(title));
  };

  const handleUpdateTaskStatus = () => {
    dispatch(
      updateTaskStatus({
        title,
        newStatus: !isCompleted,
      })
    );
  };

  return (
    <>
      <li className="task-item">
        <div className="task-content">
          <span>{id}</span>
          <h3 className={isCompleted ? "completed" : ""}>{title}</h3>
        </div>
        <div className="task-options">
          <button className="btn">
            {isCompleted ? (
              <i className="fa-solid fa-toggle-off"></i>
            ) : (
              <i className="fa-solid fa-toggle-on"></i>
            )}
          </button>
          <button className="btn" onClick={handleRemoveTask}>
            <i className="fa-solid fa-trash"></i>
          </button>
          <button
            className={`btn${isCompleted ? " checked" : ""}`}
            onClick={handleUpdateTaskStatus}
          >
            {isCompleted ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-check"></i>
            )}
          </button>
        </div>
      </li>
    </>
  );
}

TaskCard.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  isCompleted: propTypes.bool.isRequired,
};

export default TaskCard;
