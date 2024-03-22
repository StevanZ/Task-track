import { useState } from "react";
import SelectPerson from "../select-person/SelectPerson";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { filterTasks, clearFilter } from "../../slices/taskSlice";
import { useGlobalContext } from "../../context";

interface FilterDataModel {
  assigneeName?: string;
  taskStatus?: string;
}

const Filters = () => {
  const [selectedProgress, setSelectedProgress] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");

  const { isFilterOpen, setIsFilterOpen } = useGlobalContext();

  const dispatch = useDispatch<AppDispatch>();

  const resetFilter = () => {
    setSelectedProgress("");
    setSelectedPerson("");
  };

  const handleFiltering = () => {
    const filterData: FilterDataModel = {
      assigneeName: selectedPerson,
      taskStatus: selectedProgress,
    };
    dispatch(filterTasks({ ...filterData }));
  };

  const handleClearFilters = () => {
    resetFilter();
    setIsFilterOpen(false);
    dispatch(clearFilter());
  };

  return (
    <div className={`filters ${isFilterOpen ? "show-filters" : ""}`}>
      <SelectPerson
        value={selectedPerson}
        name="assigneeName"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedPerson(e.target.value)
        }
      />
      <label htmlFor="">
        Task progress
        <select
          name="taskStatus"
          value={selectedProgress}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedProgress(e.target.value)
          }
        >
          <option value="">All tasks</option>
          <option value="completed">Completed</option>
          <option value="in progress">In progress</option>
        </select>
      </label>

      <div className="buttons-wrapper">
        <button className="clear-filters" onClick={handleClearFilters}>
          Clear filters
        </button>
        <button onClick={handleFiltering} className="btn filter-btn">
          Search
        </button>
      </div>
    </div>
  );
};
export default Filters;
