import Header from "../header/Header";
import paperBackground from "../../assets/images/paper-background.jpg";
import { useEffect } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { fetchTasks } from "../../slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, AppRootState } from "../../store/store";

const TaskList = () => {
  // const [tasks, setTasks] = useState<TaskModel[]>([]);
  const tasks = useSelector((state: AppRootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="task-list">
      <div
        className="background"
        style={{
          backgroundImage: `url(${paperBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
        }}
      />
      <Header />
      <div className="tasks">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
      <TaskForm />
    </div>
  );
};
export default TaskList;
