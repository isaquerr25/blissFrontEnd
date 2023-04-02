import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Health from "./page/health";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Health />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
