export const initialState = [
  {id: 1, text: "the first todo", done: false},
  {id: 2, text: "the second todo", done: false},
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {
  console.log(state,action);
  
switch (action.type) {
  case "DONE":
    return state.map((todo) =>{
      if(action.id === todo.id){ 
        const done = !todo.done;
        return {...todo, done: done};
    }
      return todo;
  });
  case "ADD":
    return [...state, { id: state.length + 1, text: action.text, done: false }];
  default:
    break;
}

  return state;
};
