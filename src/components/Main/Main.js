import React, { useEffect, useState } from 'react'
import './Main.css'
const Main = () => {
    const arr=['Tirumalesh', 'hemanth','Naveen','shadakshari','Nishchal',"John",
    "Jane",
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Henry",
    "Isabel",
    "Jack",
    "Katie",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Peter",
    "Quinn",
    "Rachel",
    "Samuel",
    "Taylor",
    "Ursula",
    "Vincent",
    "Wendy",
    "Xander",
    "Yara",
    "Zane",];
    const [items,setItems]=useState(arr);
    const [selectedItems,setSelectedItems]=useState([]);
    const [inputValue,setInputValue]=useState('');
    const [highlightedItem,setHighlightedItem]=useState(null);
    const handleInputChange=(e)=>{
        setInputValue(e.target.value);
    };

    const handleChipRemove=(item)=>{
        setSelectedItems(selectedItems.filter((i)=>i!==item));
        setItems([...items,item]);
        setHighlightedItem(null);
    }

    const handleItemClick=(item)=>{
        setSelectedItems([...selectedItems,item]);
        setItems(items.filter((i)=>i!==item));
        setInputValue('');
        setHighlightedItem(null);
    }


    const handleBackSpace=()=>{
        if(inputValue===''&&selectedItems.length>0&&highlightedItem==null)
        {
            const lastItem=selectedItems[selectedItems.length-1];
            setHighlightedItem(lastItem);
        }
        else if(highlightedItem!=null){
            handleChipRemove(highlightedItem);
            // setSelectedItems(selectedItems.filter((item)=>item!==selectedItems));
            // setItems([...items,highlightedItem]);
            // setHighlightedItem(null);
        }
    };

    useEffect(()=>{
        const handleKeyDown=(e)=>{
            if(e.key==='Backspace')
            {
                handleBackSpace();
            }
        };
        document.addEventListener('keydown',handleKeyDown);
        return()=>{
            document.removeEventListener('keydown',handleKeyDown);
        };
    },[selectedItems,highlightedItem,inputValue]);

    
  return (
    <div className='main'>
    <div className="mb-4 mx-4">
      <div className="rounded p-2 border flex items-center">
        {selectedItems.map((item) => (
          <div key={item} className={`flex items-center border bg-${highlightedItem=== item  ? 'blue-500' : 'gray-800'}  rounded-full px-3 py-1 mr-2 mb-2`}>
            {item}
            <button
              className="ml-2 text-black font-bold"
              onClick={() => handleChipRemove(item)}
            >
              X
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add user..."
          className="ml-2 flex-grow  rounded p-2"
        />
      </div>
    </div>
      {
        inputValue&&
        <ul>
        {
            items
            .filter((item)=>item.toLowerCase().includes(inputValue.toLowerCase()))
            .map((item)=>(
                <li 
                className="flex items-center justify-center border border-gray-300 rounded-full px-3 py-1 mb-2"
                key={item} onClick={()=>handleItemClick(item)}>
                    {item}
                </li>
            ))
        }
      </ul>
      }
      
    </div>
  )
}

export default Main
