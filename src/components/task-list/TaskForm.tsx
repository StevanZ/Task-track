import { useState } from "react";
import { useGlobalContext } from "../../context";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addTask } from "../../slices/taskSlice";
import { toast } from "react-toastify";
import SelectPerson from "../select-person/SelectPerson";

const TaskForm = () => {
  const [assigneeName, setAssigneeName] = useState<string>("");
  const [formData, setFormData] = useState({
    content: "",
    description: "",
  });

  const [selecctStatus, setSelecctStatus] = useState("");

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

    console.log("form data", formData);

    if (!formData.content || !formData.description || !assigneeName) {
      const notifyId = toast("Please fill all fields");
      setTimeout(() => {
        toast.dismiss(notifyId);
      }, 1000);
      return;
    }

    const task = {
      ...formData,
      labels: [assigneeName, "in progress"],
    };

    setIsFormOpen(false);
    resetForm();
    const toastId = toast("Adding task...");
    dispatch(addTask(task)).then(() => {
      toast.dismiss(toastId);
      toast.success("Task added", {
        autoClose: 1500,
      });
    });
  };

  const handleAssigneeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log("E", e.target.value);
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
      <form
        className={`task-form ${isFormOpen ? "show" : 0}`}
        onSubmit={handleSubmit}
      >
        <h2 className="form-title">Add task</h2>
        {Object.entries(formData).map(([name, value]) => {
          return renderInput(name, value);
        })}

        <SelectPerson
          value={assigneeName}
          name="assigneeName"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleAssigneeChange(e)
          }
        />
        <button type="submit" className="btn add-task-btn">
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
