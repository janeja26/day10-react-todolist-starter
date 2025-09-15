import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://68c78c8e5d8d9f51473222b8.mockapi.io/api',
});


export const getTodos = async () => {
  const response = await instance.get('/todos');
  return response;
};


export const addTodo = async (todo) => {
  const response = await instance.post('/todos', todo);
  return response;
}

// 更新指定id的todo
export const updateTodo = async (id, updatedFields) => {
  const response = await instance.put(`/todos/${id}`, updatedFields);
  return response;
}

// 根据id获取单个todo
export const getTodoById = async (id) => {
  const response = await instance.get(`/todos/${id}`);
  return response;
}