import { MdEmojiPeople } from "react-icons/md";
import { TaskModel } from "../../models/tasks";
import { GrInProgress } from "react-icons/gr";
import { TiInputCheckedOutline } from "react-icons/ti";

interface TaskProps {
  task: TaskModel;
}

const Task = ({ task }: TaskProps) => {
  const asignTo = task.labels && task.labels[0] ? task.labels[0] : "Unassigned";
  // const dispatch = useDispatch<AppDispatch>();

  // const handleCheck = () => {
  //   if (task.id) {
  //     dispatch(
  //       update(
  //         id: task.id,
  //         {

  //       }
  //       )
  //     );
  //   }
  // };

  return (
    <div className="task">
      <div className="task-title">
        {task.content}{" "}
        {task.is_completed ? (
          <TiInputCheckedOutline
            title="Completed"
            style={{ color: "green", fontSize: 30 }}
          />
        ) : (
          <GrInProgress title="In progress" style={{ color: "darkorange" }} />
        )}
      </div>
      <div className="task-content">{task.description}</div>
      <div className="task-footer">
        <div className="person-for-task">
          <MdEmojiPeople />
          <div className="asign-to">{asignTo}</div>
        </div>
        <input type="checkbox" />
      </div>
    </div>
  );
};
export default Task;
