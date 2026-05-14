import { useState } from "react";

export default function TodoInput({ addTask, input, setInput }) {
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("general");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Pass priority and category to addTask
    addTask(e, priority, category);
    setPriority("medium");
    setCategory("general");
  };

  return (
    <form className="task-field" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter The Task you want"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button 
        type="button" 
        className="advanced-toggle"
        onClick={() => setShowAdvanced(!showAdvanced)}
        title="Toggle advanced options"
      >
        ⚙️
      </button>
      
      {showAdvanced && (
        <div className="advanced-options">
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
          </select>
        </div>
      )}
      
      <button type="submit">Add Task</button>
    </form>
  )}
