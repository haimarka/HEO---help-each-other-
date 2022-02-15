import "./App.css";
import axios from "axios";
function App() {
  return (
    <div className="App">
      <h1 onClick={async()=>{
        await axios.get('/click');
      }}>Hello Team Winners!!!1</h1>
    </div>
  );
}

export default App;
