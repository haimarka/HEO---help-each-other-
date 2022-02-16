import "./App.css";
import axios from "axios";
// import {BrowserRouter, Switch, Link} from '';
function App() {
  return (
    <div className="App">
      <h1 onClick={async()=>{
        await axios.get('/click');
      }}>Hello Team Winners For Ever!!!1</h1>

    </div>
  );
}

export default App;
