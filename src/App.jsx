import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ValentineLanding from "./components/ValentineLanding";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ValentineLanding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
