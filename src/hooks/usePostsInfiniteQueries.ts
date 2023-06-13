import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

interface PostQuery {
  pageSize: number;
}

const usePostsInfiniteQueries = (query: PostQuery) => 
       useInfiniteQuery<Post[], Error>({ // useInfiniteQuery load more each time you scroll down to bottom of page
        queryKey: ["posts", query],
        queryFn: ({pageParam = 1}) =>
          axios
            .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
              params: {
                  // userId
                  _start: (pageParam - 1) * query.pageSize,
                  _limit: query.pageSize
              }
            })
            .then((res) => res.data),
        staleTime: 1 * 60 * 1000, 
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
          // if we are on page 1 we should return 2
          // when we are on page 1, "allPages" contains only one element in its array
          return lastPage.length > 0 ? allPages.length + 1 : undefined;
        }
      });


export default usePostsInfiniteQueries