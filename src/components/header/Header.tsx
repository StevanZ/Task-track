import { FaPlus } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useGlobalContext } from "../../context";

const Header = () => {
  const { setIsFormOpen } = useGlobalContext();

  return (
    <header>
      <span className="board-name">BOARD NAME</span>
      <div className="filters-wrapper">
        <button onClick={() => setIsFormOpen(true)} className="btn add-task">
          <FaPlus /> Add task
        </button>
        <IoFilterSharp />
      </div>
    </header>
  );
};
export default Header;
