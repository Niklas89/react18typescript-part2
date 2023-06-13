import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

interface PostQuery {
  page: number;
  pageSize: number;
}

const usePostsPageNb = (query: PostQuery) => {
    const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
            // userId
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize
        }
      })
      .then((res) => res.data);

      return useQuery<Post[], Error>({
        queryKey: ["posts", query],
        queryFn: fetchPosts,
        staleTime: 1 * 60 * 1000, 
        keepPreviousData: true
      });
}

export default usePostsPageNb;