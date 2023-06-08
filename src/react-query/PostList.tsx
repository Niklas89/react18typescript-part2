import usePosts from "../hooks/usePosts";

const PostList = () => {
  // Get the data property from the response
  const { data, error, isLoading } = usePosts();

  if (isLoading) return <p>Loading...</p>;

  /* NOT NEEDED ANYMORE because we have useQuery in usePosts hook 
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => setPosts(res.data))
      .catch((error) => setError(error));
  }, []); */

  if (error) return <p>{error.message}</p>;

  return (
    <ul className="list-group">
      {data?.map((post) => (
        <li key={post.id} className="list-group-item">
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
