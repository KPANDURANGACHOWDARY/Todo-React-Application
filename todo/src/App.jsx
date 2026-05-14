import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import TaskModal from "./components/TaskModal";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("flow_tasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("flow_theme");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("flow_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("flow_theme", JSON.stringify(isDark));
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const stats = useMemo(() => {
    const total = tasks.length || 0;
    const fulfilled = tasks.filter(t => t.status === "fulfilled").length;
    const pending = total - fulfilled;
    const progress = total === 0 ? 0 : (fulfilled / total) * 100;
    return { total, fulfilled, pending, progress };
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === "all" || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddOrUpdateTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
      toast.success("Task updated successfully!");
    } else {
      setTasks([taskData, ...tasks]);
      toast.success("Task created successfully!");
    }
    setEditingTask(null);
  };

  const openAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast.info("Task removed");
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === "fulfilled" ? "pending" : "fulfilled";
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div className="app-container">
      <button 
        className={`sidebar-toggle ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        title={isSidebarOpen ? "Close Menu" : "Open Menu"}
      >
        <FiMenu />
      </button>

      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeFilter={filter} 
        onFilterChange={setFilter} 
        onAddTask={openAddTask}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <main className={`main-content ${!isSidebarOpen ? "expanded" : ""}`}>
        <header className="top-bar">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search tasks" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <section className="stats-container">
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-progress">
              <div className="stat-progress-fill" style={{ width: "100%", background: "var(--accent)" }} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Pending</span>
              <span className="stat-value">{stats.pending}</span>
            </div>
            <div className="stat-progress">
              <div className="stat-progress-fill" style={{ width: `${(stats.pending/(stats.total || 1)) * 100}%`, background: "var(--pending)" }} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-info">
              <span className="stat-label">Completed</span>
              <span className="stat-value">{stats.fulfilled}</span>
            </div>
            <div className="stat-progress">
              <div className="stat-progress-fill" style={{ width: `${stats.progress}%`, background: "var(--success)" }} />
            </div>
          </div>
        </section>

        <div className="filters-bar">
          <button className={`filter-chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All Tasks</button>
          <button className={`filter-chip ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>Pending</button>
          <button className={`filter-chip ${filter === "fulfilled" ? "active" : ""}`} onClick={() => setFilter("fulfilled")}>Fulfilled</button>
        </div>

        <div className="task-grid">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onDelete={deleteTask}
                onToggleStatus={toggleStatus}
                onEdit={openEditTask}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredTasks.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", opacity: 0.5 }}>
            <p>No tasks found.</p>
          </div>
        )}
      </main>

      <TaskModal 
        isOpen={isModalOpen} 
        initialData={editingTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }} 
        onAdd={handleAddOrUpdateTask}
      />

      <ToastContainer 
        position="bottom-right"
        theme={isDark ? "dark" : "light"}
        toastStyle={{ borderRadius: "16px", backdropFilter: "blur(10px)", border: "1px solid var(--glass-border)" }}
      />
    </div>
  );
}