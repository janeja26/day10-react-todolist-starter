import { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../contexts/TodoContext'
import { addTodo, getTodos, updateTodo, getTodoById } from '../apis/api';
import { Modal, Input, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const TodoList = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');




  useEffect(() => {
    getTodos().then(response => {
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
    await deleteTodo(id);
    dispatch({ type: 'DELETE', id });
  }

  const handleUpdate = async (id) => {
    const response = await getTodoById(id);
    const newTodo = { ...response.data, done: !response.data.done };
    await updateTodo(id, newTodo);
    await getTodos().then(response => {
      dispatch({ type: 'GET_TODOS', todos: response.data });
    });


  }

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setEditInputValue(todo.text);
    setEditModalVisible(true);
  }


  const handleSaveEdit = async () => {
    if (currentTodo && editInputValue.trim()) {
      const updatedTodo = { ...currentTodo, text: editInputValue.trim() };
      await updateTodo(currentTodo.id, updatedTodo);
      //重新获取列表更新UI
      getTodos().then(response => {

        dispatch({ type: 'GET_TODOS', todos: response.data });
      });
      setEditModalVisible(false);
    }
  }

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    // 点击取消时不保存文本，重置状态
    setCurrentTodo(null);
    setEditInputValue('');
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

        
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="large"
              onClick={() => handleDelete(id)}
              title="Delete"
            />
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="large"
              onClick={() => handleEdit({ id, text, done })}
              title="Edit"
            />
          </div>
        ))}
        <div className="input">
          
          <Input placeholder="Input todo here"
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <div><Button type="primary" size="medium" onClick={handleSubmit}>Add</Button></div>
          
        </div>
      </div>




      <Modal
        title="Edit Todo"
        open={editModalVisible}
        onCancel={handleCancelEdit}
        footer={[
          <Button key="cancel" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSaveEdit}>
            Save
          </Button>,
        ]}
      >
        <>
        <TextArea
          value={editInputValue}
          onChange={(e) => setEditInputValue(e.target.value)}
          placeholder="Enter todo text"
          rows={4}  
          
        />
          <br />
          <br />
        </>
      </Modal>



    </div>
  );
}

export default TodoList
