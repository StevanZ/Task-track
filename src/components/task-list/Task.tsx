/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdEmojiPeople } from "react-icons/md";
import { TaskModel } from "../../models/tasks";
import { GrInProgress } from "react-icons/gr";
import { TiInputCheckedOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteTaskAction, update } from "../../slices/taskSlice";
import { useDrag, useDrop } from "react-dnd";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

interface TaskProps {
  task: TaskModel;
  index: number;
  dragIndex: number;
  hoverIndex: number;
  moveTask: (dragIndex: number, hoverIndex: number) => any;
}

const Task = ({ task, index, moveTask }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "task",
    hover(item: { type: string; id: string; index: number }) {
      if (item.index !== index) {
        moveTask(item.index, index);
        item.index = index;
        // there is no backend suport for this feature
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  const asignTo = task.labels && task.labels[0] ? task.labels[0] : "Unassigned";

  const dispatch = useDispatch<AppDispatch>();

  // const handleCloseTask = () => {
  //   if (task.id) {
  //     dispatch(closeTaskAction(task.id));
  //   }
  // };

  const handleUpdateTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLabels = task.labels ? [...task.labels] : [];
    updatedLabels[1] = e.target.checked ? "completed" : "in progress";

    const updatedTask = {
      ...task,
      labels: updatedLabels,
    };

    const notifyId = toast("Updating task...");
    dispatch(update(updatedTask)).then(() => {
      toast.dismiss(notifyId);
      toast.success("Task updated", {
        autoClose: 1500,
      });
    });
  };

  const isCompleted = task.labels && task.labels[1] === "completed";

  const handleDeleteTask = () => {
    if (!task.id) return;
    const notifyId = toast("Deleting task...");
    dispatch(deleteTaskAction(task.id)).then(() => {
      toast.dismiss(notifyId);
      toast.success("Task deleted", {
        autoClose: 1500,
      });
    });
  };

  return (
    <div ref={drop} style={{ opacity }}>
      <div ref={drag}>
        <div className={`task ${isCompleted ? "completed" : ""}`}>
          <div className="task-title">
            {task.content}
            <div className="icons-wrapper">
              {isCompleted ? (
                <TiInputCheckedOutline
                  title="Completed"
                  style={{ color: "green", fontSize: 30 }}
                />
              ) : (
                <GrInProgress
                  title="In progress"
                  style={{ color: "darkorange" }}
                />
              )}
              <FaTrash onClick={handleDeleteTask} className="trash-can" />
            </div>
          </div>
          <div className="task-content">{task.description}</div>
          <div className="task-footer">
            <div className="person-for-task">
              <MdEmojiPeople />
              <div className="asign-to">{asignTo}</div>
            </div>
            <input
              title="Mark as completed"
              checked={task.labels && task.labels[1] === "completed"}
              type="checkbox"
              onChange={handleUpdateTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Task;
