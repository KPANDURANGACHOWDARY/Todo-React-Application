import { FiHome, FiCheckSquare, FiClock, FiPlus, FiMoon, FiSun, FiX } from "react-icons/fi";

export default function Sidebar({ isOpen, onClose, activeFilter, onFilterChange, onAddTask, isDark, onToggleTheme }) {
  const menuItems = [
    { id: "all", label: "Dashboard", icon: <FiHome /> },
    { id: "pending", label: "Pending", icon: <FiClock /> },
    { id: "fulfilled", label: "Fulfilled", icon: <FiCheckSquare /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      <div className="brand">
        <h1>ToDo Application</h1>
      </div>

      <nav className="nav-links">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeFilter === item.id ? "active" : ""}`}
            onClick={() => {
              onFilterChange(item.id);
              if (window.innerWidth < 768) onClose();
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
        
        <button className="nav-item" onClick={onToggleTheme}>
          {isDark ? <FiSun /> : <FiMoon />}
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </nav>

      <div className="assign-task-container">
        <button className="btn-assign" onClick={onAddTask}>
          <FiPlus />
          <span>Assign Task</span>
        </button>
      </div>
    </aside>
  );
}
