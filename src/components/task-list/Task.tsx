import { MdEmojiPeople } from "react-icons/md";
import { TaskModel } from "../../models/tasks";

interface TaskProps {
  task: TaskModel;
}

const Task = ({ task }: TaskProps) => {
  return (
    <div className="task">
      <div className="task-title">{task.content}</div>
      <div className="task-content">{task.description}</div>
      <div className="task-footer">
        <MdEmojiPeople />
        <div className="asign-to">Mile</div>
      </div>
    </div>
  );
};
export default Task;
