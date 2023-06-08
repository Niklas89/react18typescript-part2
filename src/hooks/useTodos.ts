import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }

const useTodos = () => {
    // Benefits of using React Query below:
  // - Auto retries: if the call to the back-end fails React will retry a couple more times
  // - Automatic refetch: we can configure this query to auto refetch after a period of time
  // - Caching: the first time we fetch the data, it's stored in the cache and we can use it in the app without calling the back-end, the next time we need this data
    const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);

      return useQuery<Todo[], Error>({
        // queryKey: unique identifier for the query, it's used internally for caching.
        // Anytime we retrieve data from the backend,
        // it will be stored in the cache and will be accessible via this key
        // it can store multiple values, like: queryKey: ["todos", "completed", { completed: true }]
        queryKey: ["todos"],
        // queryFn: used to fetch the data from the backend
        queryFn: fetchTodos,
      });
}

export default useTodos;