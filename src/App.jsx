import { useState } from "react";
import "./App.css";

function App() {
  const hexCode = () => {
     const hexChars = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
      hex += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return hex;
    }
  //   console.log(hex+22);
    
  //   return hex+22
  // };

  const [bg, setBg] = useState(hexCode);

  const [state, setState] = useState(true);

  const [todoItem, setTodItem] = useState({
    toDoName: "",
    toDoDescription: "",
    toDoDate: "",
    toDoTime: "",
    toDoStatus: "",
  });

  const [todoItemUpdate, setTodItemUpdate] = useState({
    toDoName: "",
    toDoDescription: "",
    toDoDate: "",
    toDoTime: "",
    toDoStatus: "",
  });

  const handelFormData = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTodItem({ ...todoItem, [name]: value });
  };
  const [items, setItems] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();
    items.push(todoItem);

    setTodItem({
      toDoName: "",
      toDoDescription: "",
      toDoDate: "",
      toDoTime: "",
      toDoStatus: "",
    });

    setState(true);
  };

  const handleSidebar = (e, todo) => {
    const currentItem = items.filter((item) => {
      return item.toDoName == todo.toDoName;
    });

    setTodItemUpdate(...currentItem);

    console.log(...currentItem);
  };

  const handleFormDataUpdate = (e) => {
    const { name, value } = e.target;
    console.log(todoItem);
    console.log(name, value);

    setTodItemUpdate({ ...todoItemUpdate, [name]: value });
  };

  const handleFormUpdate = (e) => {
    e.preventDefault();

    const itemss = items.map((item) =>
      item.toDoName == todoItemUpdate.toDoName
        ? { ...item, ...todoItemUpdate }
        : item
    );

    setItems(itemss);

    console.log(itemss);
  };

  return (
    <>
      {console.log("Items: ", items.length)}
      <div className="main bg-blue-50 p-4 w-full h-screen gap-4 flex max-sm:flex-col md:flex-row relative">
        <div className="main-lhs bg-white p-4 flex flex-col gap-4 flex-2 rounded-2xl h-full border-amber-600 max-sm:h-1/2 overflow-auto">
          <div className="filter-bar flex items-center justify-between max-sm:flex-wrap max-sm:justify-center max-sm:gap-2">
            <div className="search-bar flex items-center gap-2 py-1 px-2 bg-blue-50 rounded-2xl max-sm:w-full">
              <label htmlFor="">
                <img src="../public/icons/search.svg" alt="" />
              </label>
              <input type="text" className="outline-none max-sm:w-full" />
              <img src="../public/icons/x.svg" alt="" />
            </div>

            <div className="cta max-sm:w-full text-center">
              <button
                className="outline-none py-1 px-2 bg-blue-300 rounded-2xl text-white font-bold focus:bg-blue-200 cursor-pointer max-sm:w-full"
                onClick={() => {
                  setState(!state);
                }}
              >
                Add Task
              </button>
            </div>
          </div>
          <div
            className={`${
              state ? "hidden" : "block"
            } overlay-taskinput bg-black absolute w-full h-full left-0 top-0 opacity-50`}
          ></div>{" "}
          {/* overlay */}
          <form
            action=""
            onSubmit={(e) => {
              handleForm(e);
            }}
            className={`${
              state ? "hidden" : "flex"
            } flex-col bg-white absolute rounded-2xl left-[50%] top-[40%] py-8 px-4 transform translate-[-50%] transition-all duration-250 origin-center w-1/2 gap-4 max-sm:w-full max-sm:h-full max-sm:top-0 max-sm:left-0 max-sm:translate-0 max-sm:rounded-none opacity-100`}
          >
            <h1>Task Details</h1>
            <input
              type="text"
              className="rounded-2xl border border-gray-200 outline-none px-4 py-1 focus:border-gray-400 transition-all duration-500"
              placeholder="Task Name (in-tangable)"
              value={todoItem.toDoName}
              name="toDoName"
              onChange={(e) => {
                handelFormData(e);
              }}
            />
            <input
              type="text"
              className="rounded-2xl border border-gray-200 outline-none px-4 py-1 focus:border-gray-400 transition-all duration-500"
              placeholder="Task Description"
              value={todoItem.toDoDescription}
              name="toDoDescription"
              onChange={(e) => {
                handelFormData(e);
              }}
            />
            <input
              type="Date"
              className="rounded-2xl border border-gray-200 outline-none px-4 py-1 focus:border-gray-400 transition-all duration-500"
              value={todoItem.toDoDate}
              name="toDoDate"
              onChange={(e) => {
                handelFormData(e);
              }}
            />
            <input
              type="time"
              className="rounded-2xl border border-gray-200 outline-none px-4 py-1 focus:border-gray-400 transition-all duration-500"
              value={todoItem.toDoTime}
              name="toDoTime"
              onChange={(e) => {
                handelFormData(e);
              }}
            />

            <select
              id=""
              name="toDoStatus"
              // value={todoItem.toDoStatus}
              className="rounded-2xl border border-gray-200 outline-none px-4 py-1 focus:border-gray-400 transition-all duration-500"
              onChange={(e) => {
                handelFormData(e);
              }}
            >
              <option value="">Select Status</option>
              <option value="Begin">Begin</option>
              <option value="In-progress">In-progress</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="cta flex gap-4 max-sm:flex-wrap">
              <button className="w-full border border-gray-200 outline-none py-1 px-2 rounded-2xl text-center hover:bg-gray-200 focus:bg-gray-200 transition-all duration-500">
                Create Task
              </button>
              <a
                href="#"
                className="w-full border border-gray-200 outline-none py-1 px-2 rounded-2xl text-center hover:bg-gray-200 focus:bg-gray-200 transition-all duration-500"
                onClick={() => {
                  setState(!state);
                }}
              >
                Discard
              </a>
            </div>
          </form>
          <div className="todolist grid mx-sm:grid-cols-2 sm:grid-cols-2 gap-4">
            {items.length < 1?<p className="text-gray-400">"No task found" Add a new task</p>:""}
            {items.map((todo) => (
              <a
                href="#"
                className={`card p-4 rounded-md flex items-center justify-between cursor-pointer border border-blue-300 bg-blue-50`}
                onClick={(e) => {
                  handleSidebar(e, todo);
                }}
              >
                <div className="">
                  <h1>{todo.toDoName}</h1>
                  <p>{todo.toDoDescription}</p>
                </div>
                <div className="">
                  <p
                    className={`status ${
                      todo.toDoStatus == "In-progress"
                        ? "bg-yellow-100 border border-yellow-500"
                        : todo.toDoStatus == "Completed"
                        ? "bg-green-100 border border-green-500"
                        : "bg-blue-100 border border-blue-500"
                    } px-2 rounded-2xl`}
                  >
                    {todo.toDoStatus}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="main-rhs bg-white p-4 flex-1 rounded-2xl flex flex-col gap-6 max-sm:h-1/2 overflow-auto">
          <h1 className="text-2xl font-bold">Task Details</h1>
          <div className="task border border-gray-200 rounded-2xl h-full">
            <form
              action=""
              className="flex flex-col gap-6 p-4"
              onSubmit={(e) => {
                handleFormUpdate(e);
              }}
            >
              <p className="font-bold">My Task</p>
              <div className="flex flex-col gap-6">
                <input
                  type="text"
                  className="px-4 py-3 rounded-full outline-none border border-gray-200 text-gray-400 focus:border-gray-400 transition-all duration-500"
                  value={todoItemUpdate.toDoName}
                  name="toDoName"
                  disabled
                />
                <input
                  type="text"
                  className="px-4 py-3 rounded-full outline-none border border-gray-200 text-gray-500 focus:border-gray-400 transition-all duration-500"
                  value={todoItemUpdate.toDoDescription}
                  name="toDoDescription"
                  onChange={(e) => {
                    handleFormDataUpdate(e);
                  }}
                />
              </div>
              <table className="border-separate">
                <tbody className="">
                  <tr>
                    <td>Timline</td>
                    <td>
                      <input
                        type="Date"
                        className="px-4 py-3 rounded-full outline-none border border-gray-200 text-gray-500 w-full focus:border-gray-400 transition-all duration-500"
                        value={todoItemUpdate.toDoDate}
                        name="toDoDate"
                        onChange={(e) => {
                          handleFormDataUpdate(e);
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Time</td>
                    <td>
                      <input
                        type="time"
                        className="px-4 py-3 rounded-full outline-none border border-gray-200 text-gray-500 w-full focus:border-gray-400 transition-all duration-500"
                        value={todoItemUpdate.toDoTime}
                        name="toDoTime"
                        onChange={(e) => {
                          handleFormDataUpdate(e);
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Current Status</td>
                    <td>
                      <select
                        id=""
                        className="px-4 py-3 rounded-full outline-none border border-gray-200 text-gray-500 w-full focus:border-gray-400 transition-all duration-500"
                        name="toDoStatus"
                        onChange={(e) => {
                          handleFormDataUpdate(e);
                        }}
                      >
                        <option value="">Select Status</option>
                        <option value="Begin">Begin</option>
                        <option value="In-progress">In-progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="cta flex flex-col gap-4">
                <button className="w-full border border-gray-200 outline-none py-1 px-2 rounded-2xl hover:bg-gray-200 focus:bg-gray-200 transition-all duration-500">
                  Update Task
                </button>
                <p
                  href=""
                  className="w-full border border-gray-200 outline-none py-1 px-2 rounded-2xl text-center hover:bg-gray-200 focus:bg-gray-200 transition-all duration-500"
                >
                  Discard Task
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
