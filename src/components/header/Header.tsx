import { FaPlus } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useGlobalContext } from "../../context";
import Filters from "../filters/Filters";
import { useRef, useEffect } from "react";

const Header = () => {
  const { setIsFormOpen, isFilterOpen, setIsFilterOpen } = useGlobalContext();

  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsFilterOpen]);

  return (
    <header>
      <div className="nav-center">
        <span className="board-name">TASK TRACK</span>
        <div ref={filterRef} className="filters-wrapper">
          <Filters />
          <div
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="toggle-filters"
          >
            <IoFilterSharp />
          </div>

          <button
            onClick={() => {
              setIsFilterOpen(false);
              setIsFormOpen(true);
            }}
            className="btn add-task"
          >
            <FaPlus /> Add task
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
