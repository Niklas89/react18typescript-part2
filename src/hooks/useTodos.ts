import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../react-query/constants";
import APIClient from "../react-query/services/apiClient";

const apiClient = new APIClient<Todo>("/todos");

export interface Todo {
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
  /*  now in apiClient :
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.data);
      */

      return useQuery<Todo[], Error>({
        // queryKey: unique identifier for the query, it's used internally for caching.
        // Anytime we retrieve data from the backend,
        // it will be stored in the cache and will be accessible via this key
        // it can store multiple values, like: queryKey: ["todos", "completed", { completed: true }]
        // queryKey: ["todos"],
        queryKey: CACHE_KEY_TODOS,
        // queryFn: used to fetch the data from the backend, we reference the function fetchTodos. At runtime react will call this function.
        // queryFn: fetchTodos,
        queryFn: apiClient.getAll, // we reference getAll function
        staleTime: 10 * 1000 // either configure staleTime individually for every request or globally in the main.tsx file
      });
}

export default useTodos;