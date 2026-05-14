import TodoItem from "./TodoItem";

export default function TodoList({ filtered, toggleTask, deleteTask, onEdit, assignTask }) {
  return (
    <section className="task-list">
      {filtered.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          onEdit={onEdit}
          assignTask={assignTask}
        />
      ))}
      {filtered.length === 0 && (
        <div style={{textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)'}}>
          No items found.
        </div>
      )}
    </section>
  );
}