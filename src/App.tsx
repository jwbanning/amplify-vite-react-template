import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <div class="postman-run-button"
      data-postman-action="collection/fork"
      data-postman-visibility="public"
      data-postman-var-1="12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a"
      data-postman-collection-url="entityId=12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a&entityType=collection&workspaceId=405e0480-49cf-463b-8052-6c0d05a8e8f3"></div>
      <script type="text/javascript">
        (function (p,o,s,t,m,a,n) {
          !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
          !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
            (n = o.createElement("script")),
            (n.id = s+t), (n.async = 1), (n.src = m), n
          ));
        }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
      </script>
    </main>
  );
}

export default App;
