import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "../hooks/useTodos";
import axios from "axios";

const TodoFormFirstVersion = () => {
  // get the QueryClient that we defined in main.tsx
  const queryClient = useQueryClient();

  // useMutation(TData - data that we get from the backend, TError - our error object, TVariables - the data that we send to the backend)
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo, newTodo) => {
      // onSuccess: (savedTodo: todo from the backend, newTodo: todo created on the client) Callback

      // APPROACH 1: Invalidating the cache - delete the cache and get new data from the backend with the new todo in it
      // this approach doesn't work with jsonplaceholder API because it's a fake API, but otherwise it works
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"], // invalidate all queries whose key start with "todos"
      // })

      // APPROACH 2: Updating the data in the cache directly
      // queryClient.setQueryData(the key to what we are updating,
      // updating function that takes an array of todos - we pass todos and return an array of todos)
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);

      // clear input field after post
      if (ref.current) ref.current.value = "";
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();

          // React Query will send our data to the backend using our mutationFn
          // We will pass a todo object which will be passed to "mutationFn: (todo: Todo)"
          if (ref.current && ref.current.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
          }
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoFormFirstVersion;
