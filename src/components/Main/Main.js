import React, { useEffect, useState } from 'react'
import './Main.css'
const Main = () => {
    const arr=['Tirumalesh', 'hemanth','Naveen','shadakshari','Nishchal'];
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
      <input
        className="appearance-none border-2 border-gray-400 rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Type here....'
      />
      <div className='chips'>
        {
            selectedItems.map((item)=>(
                <div key={item} className={`flex items-center border bg-${highlightedItem=== item  ? 'blue-500' : 'gray-200'} text-${highlightedItem=== item ? 'white' : 'gray-700'} rounded-full px-3 py-1 mr-2 mb-2`}
                /*onClick={()=>handleChipRemove(item)}*/>
                    {item}
                    <span onClick={()=>handleChipRemove(item)}>X</span>
                </div>
            ))
        }
      </div>
      <ul>
        {
            items.
            filter((item)=>item.toLowerCase().includes(inputValue.toLowerCase())).
            map((item)=>(
                <li 
                className="flex items-center justify-center border border-gray-300 rounded-full px-3 py-1 mb-2"
                key={item} onClick={()=>handleItemClick(item)}>
                    {item}
                </li>
            ))
        }
      </ul>
      
    </div>
  )
}

export default Main
