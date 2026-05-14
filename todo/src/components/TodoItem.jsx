export default function TodoItem({ item, toggleTask, deleteTask, onEdit, assignTask }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return "⏳";
      case "in-progress": return "🔄";
      case "fulfilled": return "✅";
      default: return "❓";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "#f59e0b";
      case "in-progress": return "#3b82f6";
      case "fulfilled": return "#10b981";
      default: return "#6b7280";
    }
  };

  return (
    <div className={`task-card ${item.status === "fulfilled" ? "done" : ""}`}>
      <div className="task-content" onClick={() => toggleTask(item.id)}>
        <div className="check-circle" style={{ backgroundColor: getStatusColor(item.status) }}>
          <span style={{color: 'white', fontSize: '12px'}}>{getStatusIcon(item.status)}</span>
        </div>
        <div className="task-details">
          <span className="task-text">{item.text}</span>
          <div className="task-meta">
            <span className="task-status">{item.status.replace("-", " ")}</span>
            {item.priority && <span className="task-priority">{item.priority}</span>}
          </div>
        </div>
      </div>
      <div className="task-actions">
        {item.status === "pending" && (
          <button
            className="assign-btn"
            onClick={(e) => {
              e.stopPropagation();
              assignTask(item.id);
            }}
            title="Assign this task"
          >
            Assign
          </button>
        )}
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item);
          }}
        >
          Edit
        </button>
        <button
          className="remove-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(item.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}