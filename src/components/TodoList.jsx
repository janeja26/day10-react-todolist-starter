import { useContext, useState } from 'react'
import { TodoContext } from '../contexts/TodoContext'


 
const TodoList = () => {

  const { state, dispatch } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');


  function toggleDone(id) {
    const action = { type: 'DONE', id };
    dispatch(action);
  }

  function addTodo() {
    if (inputValue.trim() === '') return;
    dispatch({ type: 'ADD', text: inputValue });
    setInputValue('');
  }

  
  return (
    <div className="todo-group">
      <div className="Btitle">Todo List</div>
      <div className="context">
        <p>Add the things you need to do today...</p>
        <div className="input">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button onClick={addTodo}>add</button>
        </div>
      </div>
      {state.map(({ id, text, done }) => (
        <div
          key={id}
          className={`todo-item ${done ? 'done' : ''}`}
          onClick={() => toggleDone(id)}
        >
          {text}
        </div>
      ))} 
    </div>
  );
}

export default TodoList