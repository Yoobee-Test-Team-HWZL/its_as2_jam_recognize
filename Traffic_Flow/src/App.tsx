import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "@/router";
import Pub from "@/utils/public";
import "./App.css";

function App() {
  // Test Data
  useEffect(() => {}, []);
  //
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
