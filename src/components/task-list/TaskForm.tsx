import { useState } from "react";
import { useGlobalContext } from "../../context";
import { FaPlus, FaTimes } from "react-icons/fa";
import { createTask } from "../../services/todoistService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addTask } from "../../slices/taskSlice";

const TaskForm = () => {
  const [assigneeName, setAssigneeName] = useState<string>("");
  const [formData, setFormData] = useState({
    content: "",
    description: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const { isFormOpen, setIsFormOpen } = useGlobalContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = {
      ...formData,
      labels: [assigneeName],
    };
    // const createdTask = await createTask(task);
    dispatch(addTask(task));
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssigneeName(e.target.value);
  };

  const renderInput = (name: string, value: string) => {
    return (
      <input
        key={name}
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
      />
    );
  };

  return (
    <div
      style={{ display: isFormOpen ? "flex" : "none" }}
      className="form-wraper"
    >
      <form className="task-form" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([name, value]) => {
          return renderInput(name, value);
        })}
        <input
          type="text"
          name="assigneeName"
          value={assigneeName}
          onChange={handleAssigneeChange}
          placeholder="Assignee name"
        />
        <button type="submit" className="btn">
          <FaPlus /> Add task
        </button>
        <button
          className="btn close-btn"
          type="button"
          onClick={() => setIsFormOpen(false)}
        >
          <FaTimes />
        </button>
      </form>
    </div>
  );
};
export default TaskForm;
