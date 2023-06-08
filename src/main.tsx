import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ReactQueryDevtools is only for development mode, it will not be included in production
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";

// QueryClient object: managing and caching data in React Query
// defaultOptions: queries: retry: nb of times to retry query if query fails
// React will automatically refresh stale (old) data when:
//    - the network is reconnected: refetchOnMount
//    - a component is mounted: refetchOnReconnect
//    - the window is refocused: refetchOnWindowFocus
// Once the app got the fresh data from the backend it will update the cache and notify the browser that new data is available. The component will then rerender with fresh data.
/* const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 300_000, // in ms, equal to 5min - inactive queries are removed from the cache after 5min (garbage collection)
      staleTime: 10 * 1000, // after 10s the data queried will become stale (old data)
      refetchOnWindowFocus: false, // override the default values of our queries. Default value is true
      refetchOnReconnect: false, // default value is true
      refetchOnMount: false, // default value is true
    },
  },
}); */

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
