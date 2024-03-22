import TaskList from "./components/task-list/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="app">
      <TaskList />
      <ToastContainer />
    </main>
  );
}

export default App;
