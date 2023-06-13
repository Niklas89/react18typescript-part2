import { useState } from "react";
import usePostsPageNb from "../hooks/usePostsPageNb";

const PostListPageNb = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = usePostsPageNb({ page, pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={page === 1} // button disabled if we are on the first page
        className="btn btn-primary my-3"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary my-3 ms-1" // changed to ms instead of ml with bootstrap 5 for margin left and me instead of mr
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostListPageNb;
