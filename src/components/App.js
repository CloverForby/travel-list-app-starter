import { useRef, useEffect, useState } from "react";
// Initial packing items
/*const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];*/

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({initialItems,setItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function SubmitForm(e){
    e.preventDefault();
    setItems((prev)=>[...prev, {
      id: `${description}_${Date.now()}`,
      description: description, 
      quantity: quantity, 
      packed: false}])
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={SubmitForm}>
      <h3>What do you need to pack?</h3>
      <select value={quantity} onChange={(val) => {setQuantity(parseInt(val.target.value))}}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input value={description} onChange={(val)=>{setDescription(val.target.value)}} placeholder="Item..." />
      <button type="submit">Add</button>
    </form>
  );
}
const Item = ({item,setItems, initialItems}) => {
    const [isPacked, setPacked] = useState(item.packed)
    function removeItem(id){
      var newItems = initialItems.filter((thing)=>thing.id !== item.id);
      setItems(newItems);
    }
    function updatePacked(){
      const newPacked = !isPacked;
      setPacked(newPacked);

      const newItems = initialItems.map((thing) => 
        thing.id === item.id ? { ...thing, packed: newPacked } : thing
      );

      setItems(newItems);
    }
    return (
    <li style={isPacked === true ? {textDecoration: 'line-through'} : {}}>
       <input type="checkbox" id={`item_${item.id}`} name={`item_${item.id}`} value={isPacked} onClick={() => updatePacked()}></input>
      {item.description}
      {"("}
      {item.quantity}
      {")"}
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>)
}
function PackingList({initialItems,setItems}) {
  
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => <Item key={item.id} item={item} setItems={setItems} initialItems={initialItems}/>)}
      </ul>
    </div>
  );
}

function Stats({initialItems,setItems}) {
  var itemCount = initialItems.length;
  //var totalItems = initialItems.reduce((arr, val) => {return arr + val.quantity}, 0)
  var packedItems = initialItems.filter((item) => item.packed).length;
  var percentage = Math.round((packedItems / itemCount) * 100);
  var message = "";
  if (itemCount === 0){
    message = "You don't have any items, add some!"
  } else if (itemCount > 0 && percentage !== 100){
    message = `You have ${itemCount} items in the list. You already packed ${packedItems} (${Math.round((packedItems / itemCount) * 100)}%).`
  } else if (itemCount > 0 && percentage === 100){
    message = "You're all packed!"
  }
  return (
    <footer className="stats">
      <em>{message}</em>
    </footer>
  );
}

function App() {
  const [initialItems, setItems] = useState([
    { id: 1, description: "Shirt", quantity: 5, packed: false },
    { id: 2, description: "Pants", quantity: 2, packed: false },
  ]) 
  return (
    <div className="app">
      <Logo />
      <Form initialItems={initialItems} setItems={setItems}/>
      <PackingList initialItems={initialItems} setItems={setItems}/>
      <Stats initialItems={initialItems} setItems={setItems}/>
    </div>
  );
}

export default App;
