import { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../contexts/TodoContext'
import { addTodo, getTodos, updateTodo, getTodoById } from '../apis/api';


const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');




  useEffect(() => {
    getTodos().then(response => {
      // 这里可以处理获取到的 todos
      dispatch({ type: 'GET_TODOS', todos: response.data });
    });
  }, [dispatch]);



  const handleSubmit = async () => {
    if (inputValue && inputValue.trim()) {
      const newTodo = {
        text: inputValue.trim(),
        done: false
      }
      const response = await addTodo(newTodo);
      dispatch({ type: 'ADD', todo: response.data });
      setInputValue('');
    }
  }

  const handleDelete = async (id) => {
    console.log(id);
    await handleDelete(id);
    dispatch({ type: 'DELETE', id });
  }

  const handleUpdate = async (id) => {
    const response = await getTodoById(id);
    const newTodo = { ...response.data, done: !response.data.done };
    await updateTodo(id, newTodo);
    await getTodos().then(response => {
      // 这里可以处理获取到的 todos
      dispatch({ type: 'GET_TODOS', todos: response.data });
    });


  }


  function deleteTodo(id) {
    // 发送删除动作到context
    dispatch({ type: 'DELETE', id });
  }


  return (
    <div className="todo-list">
      <h3>Todo List</h3>
      <div className="todo-group">



        {state.length === 0 && (
          <p>Add the things you need to do today...</p>
        )}

        {state.map(({ id, text, done }) => (
          <div className="todo-items">
            <div
              key={id}
              className={`todo-item ${done ? 'done' : ''}`}
              onClick={() => handleUpdate(id)}
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
          <button className='add-button' onClick={handleSubmit}>add</button>
        </div>
      </div>
    </div>
  );
}

export default TodoList
