import "./App.css";
import { useState, useReducer } from "react";

const ACTIONS = {
  ADD_TASK: "add-task",
  TOGGLE_TASK: "toggle-task",
  DELETE_TASK: "delete-task",
};

function reducer(task, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...task, newTodo(action.payload.name)];

    case ACTIONS.TOGGLE_TASK:
      return task.map((v) => {
        if (v.id === action.payload.id) {
          return { ...v, complete: !v.complete };
        }
        return v;
      });
    case ACTIONS.DELETE_TASK:
      return task.filter((v) => v.id != action.payload.id);
    default:
      return task;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

function App() {
  const [name, setName] = useState("");
  const [task, dispatch] = useReducer(reducer, []);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: { name: name, color: "black" },
    });
    setName("");
  }

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      />

      <br />

      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      <br />

      <div class="container">
        <ul class="list-group">
          {task.map((v) => {
            return (
              <>
                <li class="list-group-item">
                  {" "}
                  <p
                    key={v.id}
                    style={{ color: v.complete ? "gray" : "black" }}
                  >
                    {v.name}
                  </p>
                  <button
                    onClick={() =>
                      dispatch({
                        type: ACTIONS.TOGGLE_TASK,
                        payload: { id: v.id },
                      })
                    }
                  >
                    Toggle
                  </button>{" "}
                  <button
                    onClick={() =>
                      dispatch({
                        type: ACTIONS.DELETE_TASK,
                        payload: { id: v.id },
                      })
                    }
                  >
                    Delete
                  </button>{v.complete ? <p className="donep"> Done </p> :null}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
