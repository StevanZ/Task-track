import Header from "../header/Header";
import paperBackground from "../../assets/images/background-opacity.png";
import { useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { fetchTasks } from "../../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { moveTask } from "../../slices/taskSlice";

import { AppDispatch, AppRootState } from "../../store/store";
import Loader from "../Loader";

const TaskList = () => {
  const tasks = useSelector((state: AppRootState) => state.tasks.tasks);
  const loading = useSelector((state: AppRootState) => state.tasks.loading);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // console.log("loading", loading);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="task-list"
        style={{
          backgroundImage: `url(${paperBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <div className="tasks">
          {loading && <div className="loader"></div>}
          {tasks.map((task, index) => {
            return (
              <Task
                key={task.id}
                task={task}
                index={index}
                moveTask={(dragIndex, hoverIndex) =>
                  dispatch(moveTask({ dragIndex, hoverIndex }))
                }
                dragIndex={0}
                hoverIndex={0}
              />
            );
          })}
        </div>
        <TaskForm />
      </div>
    </DndProvider>
  );
};
export default TaskList;
