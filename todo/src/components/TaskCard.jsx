import { motion } from "framer-motion";
import { FiTrash2, FiEdit2, FiCheckCircle, FiClock, FiCalendar } from "react-icons/fi";
import { format } from "date-fns";

export default function TaskCard({ task, onDelete, onToggleStatus, onEdit }) {
  const isFulfilled = task.status === "fulfilled";

  const priorityColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#10b981",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className={`task-card ${isFulfilled ? "fulfilled" : ""}`}
      style={{ "--status-color": priorityColors[task.priority] }}
    >
      <div className="task-header">
        <span className="priority-badge" style={{ background: priorityColors[task.priority] }}>
          {task.priority}
        </span>
        <div className="status-indicator" style={{ color: isFulfilled ? "var(--success)" : "var(--pending)" }}>
          {isFulfilled ? <FiCheckCircle /> : <FiClock />}
          <span>{task.status}</span>
        </div>
      </div>

      <div className="task-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="task-footer">
        <div className="task-date">
          <FiCalendar />
          <span>{task.dueDate ? format(new Date(task.dueDate), "MMM dd, yyyy") : "No date"}</span>
        </div>
        
        <div className="task-actions">
          <button className="action-btn" onClick={() => onEdit(task)} title="Edit Task">
            <FiEdit2 />
          </button>
          <button className="action-btn" onClick={() => onToggleStatus(task.id)} title="Update Status">
            {isFulfilled ? <FiClock /> : <FiCheckCircle />}
          </button>
          <button className="action-btn delete" onClick={() => onDelete(task.id)} title="Delete Task">
            <FiTrash2 />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
