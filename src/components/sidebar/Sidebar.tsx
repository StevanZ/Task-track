import { CiSquarePlus } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="logo duru-sans-regular">Task Track</div>
        <nav className="links">
          <div className="add-new-board">
            <CiSquarePlus style={{ fontSize: 23 }} /> New board
          </div>
          <ul>
            {/* <li>
              <span>Dashboard</span>
            </li>
            <li>
              <span>New Project</span>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
