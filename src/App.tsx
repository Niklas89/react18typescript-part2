import "./App.css";
import PostList from "./react-query/PostList";
import PostListInfiniteQueries from "./react-query/PostListInfiniteQueries";
import PostListPageNb from "./react-query/PostListPageNb";
import TodoForm from "./react-query/TodoForm";
import TodoFormOnMutate from "./react-query/TodoFormOnMutate";
import TodoList from "./react-query/TodoList";

function App() {
  // return <TodoList />;
  // return <PostList />;
  // return <PostListPageNb />;
  // return <PostListInfiniteQueries />;

  return (
    <>
      <TodoFormOnMutate />
      <TodoList />
    </>
  );
}

export default App;
