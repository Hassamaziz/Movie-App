import "./App.css";
import { useState } from "react";

const Card = (props) => {
  return (
    <div className="card">
      <h2>{props.title}</h2>
    </div>
  );
};
const App = () => {
  const [hasLiked , setHasLiked] = useState(false);
  return (
    <div className="card-container">
      <Card title="Avatar" />
      <Card title="Spider-Man" />
      <Card title="The Batman" />
    </div>
  );
};

export default App;
