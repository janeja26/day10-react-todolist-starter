// src/components/DonePage.jsx
import { useContext, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { getTodos } from '../apis/api';
import { Button } from 'antd';
import { getTodoById, updateTodo } from '../apis/api';

const DonePage = () => {
  const { state, dispatch } = useContext(TodoContext);

  useEffect(() => {
    getTodos().then(response => {
      dispatch({ type: 'GET_TODOS', todos: response.data });
    });
  }, [dispatch]);

  // 筛选已完成的任务
  const doneTodos = state.filter(todo => todo.done);

  const handleUndo = async (id) => {
    const response = await getTodoById(id);
    const updatedTodo = { ...response.data, done: false };
    await updateTodo(id, updatedTodo);
    // 刷新列表
    getTodos().then(res => {
      dispatch({ type: 'GET_TODOS', todos: res.data });
    });
  };

  return (
    <div className="done-page">
      <h2>Completed Tasks</h2>
      {doneTodos.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        <div className="todo-group">
          {doneTodos.map(({ id, text }) => (
            <div className="todo-items" key={id}>
              <div className="todo-item done">
                {text}
              </div>
              <Button 
                size="small" 
                onClick={() => handleUndo(id)}
              >
                Undo
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonePage;