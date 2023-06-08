import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

const usePosts = () => {
    // Benefits of using React Query below:
  // - Auto retries: if the call to the back-end fails React will retry a couple more times
  // - Automatic refetch: we can configure this query to auto refetch after a period of time
  // - Caching: the first time we fetch the data, it's stored in the cache and we can use it in the app without calling the back-end, the next time we need this data
    const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);

      return useQuery<Post[], Error>({
        // queryKey: unique identifier for the query, it's used internally for caching.
        // Anytime we retrieve data from the backend,
        // it will be stored in the cache and will be accessible via this key
        // it can store multiple values, like: queryKey: ["posts", "completed", { completed: true }]
        queryKey: ["posts"],
        // queryFn: used to fetch the data from the backend
        queryFn: fetchPosts,
        staleTime: 1 * 60 * 1000 // 1min until stale : either configure staleTime individually for every request or globally in the main.tsx file
      });
}

export default usePosts;