import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<div>start</div>} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
