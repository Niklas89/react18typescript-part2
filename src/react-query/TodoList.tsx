import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const TodoList = () => {
  // Benefits of the below method:
  // - Auto retries: if the call to the back-end fails React will retry a couple more times
  // - Automatic refetch: we can configure this query to auto refetch after a period of time
  // - Caching: the first time we fetch the data, it's stored in the cache and we can use it in the app without calling the back-end, the next time we need this data
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

  // Get the data property from the response, which we have renamed "todos" and get the error and the isLoading prop
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    // queryKey: unique identifier for the query, it's used internally for caching.
    // Anytime we retrieve data from the backend,
    // it will be stored in the cache and will be accessible via this key
    // it can store multiple values, like: queryKey: ["todos", "completed", { completed: true }]
    queryKey: ["todos"],
    // queryFn: used to fetch the data from the backend
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading...</p>;

  /* NOT NEEDED ANYMORE because we have useQuery above 

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
