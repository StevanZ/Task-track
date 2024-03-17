import Sidebar from "./components/sidebar/Sidebar";
import TaskList from "./components/task-list/TaskList";

function App() {
  return (
    <main className="app">
      <Sidebar />
      <TaskList />
    </main>
  );
}

export default App;
