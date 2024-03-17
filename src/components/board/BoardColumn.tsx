import { FaPlus } from "react-icons/fa";

const BoardColumn = () => {
  return (
    <article className="board-column">
      <div className="board-column-header">
        <div className="board-column-title">To Do</div>
        <div className="board-column-options">
          <div className="board-column-option">...</div>
        </div>
      </div>

      <div className="board-column-content">
        <div className="board-column-card">
          <div className="board-column-card-title">Task 1</div>
          <div className="board-column-card-description">Description</div>
        </div>
        <div className="board-column-card">
          <div className="board-column-card-title">Task 1</div>
          <div className="board-column-card-description">Description</div>
        </div>
        <div className="board-column-card">
          <div className="board-column-card-title">Task 1</div>
          <div className="board-column-card-description">Description</div>
        </div>
        <div className="board-column-card">
          <div className="board-column-card-title">Task 1</div>
          <div className="board-column-card-description">Description</div>
        </div>
      </div>

      <div className="board-column-footer">
        <button className="add-card">
          <FaPlus /> Add Crad
        </button>
      </div>
    </article>
  );
};
export default BoardColumn;
