import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { FaPlus, FaRegEdit, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addTask, update } from "../../slices/taskSlice";
import { toast } from "react-toastify";
import SelectPerson from "../select-person/SelectPerson";

import { TaskModel } from "../../models/tasks";

interface TaskFormProps {
  taskForEdit: TaskModel | null;
  setTaskForEdit: (task: TaskModel | null) => void;
}

const TaskForm = ({ taskForEdit, setTaskForEdit }: TaskFormProps) => {
  const [assigneeName, setAssigneeName] = useState<string>(
    taskForEdit && taskForEdit.labels ? taskForEdit.labels[0] : ""
  );
  const [formData, setFormData] = useState({
    content: taskForEdit?.content ? taskForEdit.content : "",
    description: taskForEdit ? taskForEdit.description : "",
  });

  useEffect(() => {
    setAssigneeName(
      taskForEdit && taskForEdit.labels ? taskForEdit.labels[0] : ""
    );
    setFormData({
      content: taskForEdit?.content ? taskForEdit.content : "",
      description: taskForEdit ? taskForEdit.description : "",
    });
  }, [taskForEdit]);

  const dispatch = useDispatch<AppDispatch>();

  const { isFormOpen, setIsFormOpen } = useGlobalContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ content: "", description: "" });
    setAssigneeName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.content || !formData.description || !assigneeName) {
      const notifyId = toast("Please fill all fields");
      setTimeout(() => {
        toast.dismiss(notifyId);
      }, 1000);
      return;
    }

    const task: {
      id?: string;
      labels: string[];
      content: string;
      description?: string;
    } = {
      ...formData,
      labels: [assigneeName, "in progress"],
    };

    setIsFormOpen(false);
    resetForm();

    if (taskForEdit) {
      task.id = taskForEdit.id;
      dispatch(update(task)).then(() => {
        toast.success("Task updated", {
          autoClose: 1500,
        });
        setTaskForEdit(null);
      });
    } else {
      dispatch(addTask(task)).then(() => {
        toast.success("Task added", {
          autoClose: 1500,
        });
      });
    }
  };

  const handleAssigneeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAssigneeName(e.target.value);
  };

  console.log("taskForEdit", taskForEdit);

  return (
    <div
      style={{ display: isFormOpen ? "flex" : "none" }}
      className="form-wraper"
    >
      <form
        className={`task-form ${isFormOpen ? "show" : 0}`}
        onSubmit={handleSubmit}
      >
        <h2 style={{ textAlign: "center" }} className="form-title">
          {taskForEdit ? "Edit task" : "Add task"}
        </h2>
        <label>
          Title
          <input
            key={"content"}
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Task title"
          />
        </label>

        <label>
          Description
          <input
            key={"description"}
            type="text"
            name={"description"}
            value={formData.description}
            onChange={handleChange}
            placeholder="Task description"
          />
        </label>

        <SelectPerson
          value={assigneeName}
          name="assigneeName"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleAssigneeChange(e)
          }
        />
        <button type="submit" className="btn add-task-btn">
          {taskForEdit ? (
            <span className="edit-span">
              <FaRegEdit /> Edit
            </span>
          ) : (
            <span className="add-span">
              <FaPlus /> Add task
            </span>
          )}
        </button>
        <button
          className="btn close-btn"
          type="button"
          onClick={() => {
            setIsFormOpen(false);
            setTaskForEdit(null);
          }}
        >
          <FaTimes />
        </button>
      </form>
    </div>
  );
};
export default TaskForm;
