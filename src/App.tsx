import "./App.css";
import PostList from "./react-query/PostList";
import PostListInfiniteQueries from "./react-query/PostListInfiniteQueries";
import PostListPageNb from "./react-query/PostListPageNb";
import TodoList from "./react-query/TodoList";

function App() {
  // return <TodoList />;
  // return <PostList />;
  // return <PostListPageNb />;
  return <PostListInfiniteQueries />;
}

export default App;
