## How fontend send an API call to backend

Project use a [custom hook](https://react.dev/reference/react/useCallback) - <strong>```useFetch```</strong>, to make calls to backend

```useFetch``` is a small custom React hook that helps us make API requests while automatically handling:

- loading state
- error state
- JSON requests (GET, POST, PUT, DELETE, etc.)
- stringifying request bodies
- try/catch error handling

It keeps API calls clean and consistent across the whole project.

### How to import
```import { useFetch } from "../useFetch";```

### How to use inside a component
```const { executeFetch, loading, error } = useFetch();```

Now executeFetch is your helper function for making backend requests.

### Making a simple GET request
```
const loadGoals = async () => {
  const data = await executeFetch("/api/goals", "GET");
  console.log(data);
};
```
### Making a POST or PUT request with a body

Just pass a JavaScript object — the hook handles JSON automatically.
```
const createGoal = async () => {
  const body = { title: "New goal" };

  const result = await executeFetch("/api/goals", "POST", body);
  console.log(result);
};
```
### Handling errors

The hook sets error when something goes wrong.
```
if (error) {
  return <p>Error: {error}</p>;
}
```
### Showing a loading state

loading becomes true during any request.

```if (loading) return <p>Loading...</p>;```

---

## How to Write URLs When Using executeFetch

In <strong>DEV</strong> When calling the backend from React we write only the API path, e.g.:

```executeFetch("/api/goals");```

Vite will automatically forward this request to the backend server.

### How the Vite Proxy Works

Vite uses this proxy config (already in our project):
```
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
    },
  },
},
```
This tells Vite:

“If the frontend makes a request to something starting with /api, send it to http://localhost:3000 instead.”

So this:
```/api/goals```
is automatically turned into:
```http://localhost:3000/api/goals```
