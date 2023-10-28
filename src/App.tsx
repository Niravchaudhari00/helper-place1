import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/home/Home";

function App() {
  return (
    <>
      <div className="w-full mx-auto">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

        {/* Footer */}
      </div>
    </>
  );
}

export default App;
