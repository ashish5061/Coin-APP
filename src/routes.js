import * as React from "react";
import { Routes, Route} from "react-router-dom";
import App from './App'

function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />     
      </Routes>
    </div>
  );
}

export default Router

