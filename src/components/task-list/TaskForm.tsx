import { useState } from "react";
import { useGlobalContext } from "../../context";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    person: "",
  });

  const { isFormOpen, setIsFormOpen } = useGlobalContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      style={{ display: isFormOpen ? "flex" : "none" }}
      className="form-wraper"
    >
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="person"
          value={formData.person}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Add task
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => setIsFormOpen(false)}
        >
          Close
        </button>
      </form>
    </div>
  );
};
export default TaskForm;
