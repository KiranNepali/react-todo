import { FaPlusCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useState, useEffect } from "react";

function App() {
  // Function to retrieve items from local storage
  const getItemsFromLocalStorage = () => {
    const storedItems = localStorage.getItem("todoItems");
    return storedItems ? JSON.parse(storedItems) : [];
  };

  const [input, setInput] = useState("");
  const [items, setItems] = useState(() => getItemsFromLocalStorage());

  // Save items to local storage whenever items change
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(items));
  }, [items]);

  // add item
  const addItem = () => {
    if (!input) {
      alert("Please fill the input field.");
    } else {
      setItems([...items, input]);
      setInput("");
      console.log(items);
    }
  };

  // delete item
  const deleteBtn = (index) => {
    // Create a copy of the current items array
    const newItems = [...items];

    // Remove the item at the specified index using splice
    newItems.splice(index, 1);

    // Update the state with the new array without the deleted item
    setItems(newItems);
  };

  //edit item
  const editBtn = () => {};
  return (
    <>
      <div className="w-[100%] min-h-[100vh] flex justify-center items-center bg-[#FC6736] ">
        <div className="w-[50rem] h-[50rem] bg-white p-[4px] flex items-center text-center flex-col ">
          {/* top part  */}
          <div className="">
            {/* heading  */}
            <h1 className="w-[100%] text-[3rem] tracking-wider font-semibold">
              TODOS
            </h1>
            {/* add input value  */}
            <div className="flex justify-center items-center py-[2rem] ">
              <input
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Enter todo list"
                className="w-[30rem] h-[3rem] px-[8px] py-[3px] focus:outline-none focus:bg-gray-100 rounded-md border-[1px] border-gray-300  "
              />
              <FaPlusCircle
                onClick={addItem}
                className="w-[3rem] h-[3rem] text-[#63c03b] ml-[-2rem]  right-[8rem] bg-white rounded-[50%] cursor-pointer "
              />
            </div>
          </div>

          {/* render input items  */}
          <div className="flex justify-center items-center flex-col gap-10 overflow-hidden overflow-y-scroll mb-9">
            {items.map((val, index) => {
              return (
                <div
                  key={index}
                  className=" w-[35rem] h-[3rem] p-[4px] flex justify-between items-center border-b-[1px] border-bg-gray-100"
                >
                  <p className="">{val}</p>
                  <div className="flex justify-center items-center gap-6">
                    <MdOutlineEdit className="text-green-600 w-5 h-5" />
                    <MdDeleteOutline
                      onClick={deleteBtn}
                      className="text-red text-red-500 w-5 h-5"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
