import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const headerStyle = {
    width: isSidebarOpen ? "calc(100% - 320px)" : "100%",
  };

  return (
    <header style={headerStyle}>
      <span className="board-name">BOARD NAME</span>
      <div>
        <IoFilterSharp />
      </div>

      {/* <span>sdasdasdasds</span> */}
    </header>
  );
};
export default Header;
