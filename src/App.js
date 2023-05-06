import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Rodape from "./components/Footer/Footer";
import Container from "./components/Container/Container";



function App() {
  return (
    <div>
      <Navbar/>
      <Container/>
      <Rodape/>
    </div>
  );
}

export default App;
