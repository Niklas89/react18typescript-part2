import useTodos from "../hooks/useTodos";

const TodoList = () => {
  // Get the data property from the response, which we have renamed "todos" and get the error and the isLoading prop
  const { data: todos, error, isLoading } = useTodos();

  if (isLoading) return <p>Loading...</p>;

  /* NOT NEEDED ANYMORE because we have useQuery in useTodos hook  

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data))
      .catch((error) => setError(error));
  }, []); */

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {todos?.map((todo) => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
