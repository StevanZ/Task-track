import Board from "../board/Board";
import Header from "../header/Header";
import paperBackground from "../../assets/images/paper-background.jpg";

const TaskList = () => {
  return (
    <div className="task-list">
      <div
        className="background"
        style={{
          backgroundImage: `url(${paperBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // filter: "blur(4px)",
          opacity: 0.3,
        }}
      />

      <Header />
      <Board />
    </div>
  );
};
export default TaskList;
