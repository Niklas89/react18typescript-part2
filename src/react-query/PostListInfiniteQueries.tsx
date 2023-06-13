import { useState } from "react";
import usePostsInfiniteQueries from "../hooks/usePostsInfiniteQueries";
import React from "react";

const PostListInfiniteQueries = () => {
  // useInifiniteQuery handle pagination automatically, so we don't need page variable
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePostsInfiniteQueries({
      pageSize,
    });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3 ms-1" // changed to ms instead of ml with bootstrap 5 for margin left and me instead of mr
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostListInfiniteQueries;
