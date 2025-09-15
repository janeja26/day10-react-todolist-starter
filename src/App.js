import { useReducer } from "react";
import "./App.css";
import "./components/TodoList.css";
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducers/todoReducer";
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router";
import { TodoContext } from "./contexts/TodoContext";
import DefaultLayout from"./components/Layout";
import DonePage from './components/DonePage';

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <h1>Home Page</h1> },
      { path: "todos", element: <TodoList /> },
      { path: "todos/:key", element: <TodoDetail /> },
      { path: "about", element: <h1>About Us</h1> },
      { path: "done", element: <DonePage /> }
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  // the Hooks API manage component data state
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const value = { state, dispatch };
  return (
    <div className="App">
      <TodoContext.Provider value={value}>
        <RouterProvider router={router}></RouterProvider>
      </TodoContext.Provider>
    </div>
  );
}

// function DefaultLayout() {
//   return (
//     <>
//       <header>
//         <nav>
//           <li>
//             <NavLink to={"/"}>Home</NavLink>
//           </li>
//           <li>
//             <NavLink to={"/todos"}>TodoList</NavLink>
//           </li>
//           <li>
//             <NavLink to={"todos/:key"}>TodoDetail</NavLink>
//           </li>
//           <li>
//             <NavLink to={"/about"}>About</NavLink>
//           </li>
//         </nav>
//       </header>
//       <main>
//         <h1>Welcome to the Todo App</h1>
//         <Outlet></Outlet>
//       </main>
//       <footer>footer content</footer>
//     </>
//   );
// }

function ErrorPage() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function TodoDetail() {
  const { key } = useParams();
  console.log(key);
  return <h1>This is {key} Detail </h1>;
}

export default App;
