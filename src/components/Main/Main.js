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
        if(inputValue===''&&selectedItems.length>0&&highlightedItem===null)
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
        document.addEventListener('keydown',handleBackSpace);
        return()=>{
            document.removeEventListener('keydown',handleBackSpace);
        };
    },[selectedItems,highlightedItem,inputValue]);

    
  return (
    <div className='main'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Type here....'
      />
      <div className='chips'>
        {
            selectedItems.map((item)=>(
                <div key={item} className={`chip ${highlightedItem=== item ? 'highlighted':''}`}
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
                <li key={item} onClick={()=>handleItemClick(item)}>
                    {item}
                </li>
            ))
        }
      </ul>
      
    </div>
  )
}

export default Main
