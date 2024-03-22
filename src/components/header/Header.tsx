import { FaPlus } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useGlobalContext } from "../../context";
import Filters from "../filters/Filters";

const Header = () => {
  const { setIsFormOpen, isFilterOpen, setIsFilterOpen } = useGlobalContext();

  return (
    <header>
      <span className="board-name">TASK TRACK</span>
      <div className="filters-wrapper">
        <div
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="toggle-filters"
        >
          <IoFilterSharp />
        </div>

        <button onClick={() => setIsFormOpen(true)} className="btn add-task">
          <FaPlus /> Add task
        </button>
      </div>
      <Filters />
    </header>
  );
};
export default Header;
