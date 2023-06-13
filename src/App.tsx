import "./App.css";
import PostList from "./react-query/PostList";
import PostListInfiniteQueries from "./react-query/PostListInfiniteQueries";
import PostListPageNb from "./react-query/PostListPageNb";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  // return <TodoList />;
  // return <PostList />;
  // return <PostListPageNb />;
  // return <PostListInfiniteQueries />;

  return (
    <>
      <TodoForm />
      <TodoList />
    </>
  );
}

export default App;
