import { useEffect, useState } from "react";
import "./App.css";
import TaskCard from "./components/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAction,
  updateTaskStatus,
  loadTasks,
} from "./redux/actions/TaskAction";
import SearchBox from "./components/SearchBox";

function App() {
  const [newTask, setNewTask] = useState("");
  const [sortCriteria, setSortCriteria] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const globalTasks = useSelector((state) => state.Todo);

  // first loading tasks from local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    dispatch(loadTasks(storedTasks));
  }, [dispatch]);

  useEffect(() => {
    const data = globalTasks.filter((task) => {
      const isMatch =
        sortCriteria === "All" ||
        (sortCriteria === "Completed" && task.isDone) ||
        (sortCriteria === "Incomplete" && !task.isDone);

      if (isMatch) return true;
      return false;
    });

    setTasks(data);
  }, [globalTasks, sortCriteria, searchValue]);

  // update local storage whenever state changed
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(globalTasks));
  }, [globalTasks]);

  const handleChangeNewTask = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddNewTask = (event) => {
    event.preventDefault();
    if (!newTask.trim()) return;
    dispatch(addTaskAction(newTask));
    setNewTask("");
  };

  const handleChangeSortCriteria = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    const data = globalTasks.filter((task) =>
      task.title.includes(searchValue.trim())
    );
    setTasks(data);
  };

  const handleMarkAllTasksCompleted = () => {
    tasks.forEach((task) => {
      dispatch(
        updateTaskStatus({
          title: task.title,
          newStatus: true,
        })
      );
    });
  };

  return (
    <>
      <main className="app">
        <h1>My Todo App</h1>
        <form action="#" method="POST">
          <input
            type="text"
            value={newTask}
            placeholder="Enter new task"
            spellCheck="false"
            autoFocus
            onChange={handleChangeNewTask}
          />
          <button className="btn" type="submit" onClick={handleAddNewTask}>
            Add
          </button>
        </form>

        <div className="controls">
          <div className="control-left">
            <select
              className="sort"
              value={sortCriteria}
              onChange={handleChangeSortCriteria}
            >
              <option value="All" defaultChecked>
                All
              </option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
            </select>
            <button className="btn" onClick={handleMarkAllTasksCompleted}>
              Mark All Completed
            </button>
          </div>
          <div className="control-right">
            <SearchBox
              searchValue={searchValue}
              handleOnChange={(event) => setSearchValue(event.target.value)}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        <span>All your tasks here...</span>
        <ul className="task-list">
          {tasks.filter((task) => task.title.includes(searchValue.trim()))
            .length ? (
            tasks
              .filter((task) => task.title.includes(searchValue.trim()))
              .map((task, index) => (
                <TaskCard
                  id={index + 1}
                  key={task.title}
                  title={task.title}
                  isCompleted={task.isDone}
                />
              ))
          ) : (
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
              No task found
            </p>
          )}
        </ul>
      </main>
    </>
  );
}

export default App;
