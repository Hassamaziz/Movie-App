import "./App.css";
import { useEffect, useState } from "react";

const Card = (props) => {
  const [hasLiked , setHasLiked] = useState(false);
  useEffect(()=>{
console.log(`You have ${hasLiked ? "liked" : "not liked"} ${props.title}`);

  });
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "❤️" : "🤍"}

      </button>
    </div>
  );
};
const App = () => {
  
  return (
    <div className="card-container">
      <Card title="Avatar" />
      <Card title="Spider-Man" />
      <Card title="The Batman" />
    </div>
  );
};

export default App;
