import React, { useState, ChangeEvent } from 'react';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

const Todolist: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  // Adding new item 
  const handleAddItem = () => {
    if (newItem.trim().length === 0) return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: newItem.trim(),
      completed: false,
    };
    setItems([...items, newTodo]);
    setNewItem('');
  };

  // Toggle 
  const toggleComplete = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Delete an item from the list
  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>To Do List</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newItem}
          onChange={handleInputChange}
          placeholder="Add new task"
          style={styles.input}
        />
        <button onClick={handleAddItem} style={styles.addButton}>Add</button>
      </div>
      <ul style={styles.list}>
        {items.map(item => (
          <li key={item.id} style={styles.listItem}>
            <span
              onClick={() => toggleComplete(item.id)}
              style={{
                ...styles.itemText,
                textDecoration: item.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {item.text}
            </span>
            <button onClick={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center'
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '10px'
  },
  input: {
    flex: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  addButton: {
    padding: '8px 12px',
    marginLeft: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    borderBottom: '1px solid #eee'
  },
  itemText: {
    flex: 1,
    fontSize: '16px'
  },
  deleteButton: {
    marginLeft: '10px',
    padding: '4px 8px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Todolist;