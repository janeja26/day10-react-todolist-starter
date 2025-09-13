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
   function deleteTodo(id) {
    // 发送删除动作到context
    dispatch({ type: 'DELETE', id });
  }


  return (
    <div className="todo-list">
      <h3>Todo List</h3>
    <div className="todo-group">
      {/* 当列表为空的时候这个p标签才展示 */}
       {state.length === 0 && (
        <p>Add the things you need to do today...</p>
      )}
        {/* 待办项列表现在放在maincontext容器内 */}
          {state.map(({ id, text, done }) => (
            <div className="todo-items">
              <div
                key={id}
                className={`todo-item ${done ? 'done' : ''}`}
                onClick={() => toggleDone(id)}
              >
                {text}
              </div>
              <button className='delete-button' onClick={() => deleteTodo(id)}>X</button>
            </div>
          ))}
        <div className="input">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button className='add-button' onClick={addTodo}>add</button>
        </div>
      </div>
    </div>
  );
}

export default TodoList
