import Header from "../header/Header";
import paperBackground from "../../assets/images/paper-background.jpg";
import { useEffect, useState } from "react";
import { getTasks } from "../../services/todoistService";
import { TaskModel } from "../../models/tasks";
import Task from "./Task";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const fetchTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
