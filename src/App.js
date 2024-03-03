import logo from "./logo.svg";
import Main from "./Pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Certificate from "./Pages/Certificate";
import "firebase/database";


function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/certificate" element={<Certificate/>}></Route>
      </Routes>
    </>
  );
}

// firebase.initializeApp(firebaseConfig);
export default App;
