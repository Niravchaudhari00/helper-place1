import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/home/Home";
import NotFound from "./page/NotFound";
import FindCandidate from "./page/find-candidate/FindCandidate";

function App() {
  return (
    <>
      <div className="">
        <Navbar />

        {/* Routes */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route index path="find-candidate" element={<FindCandidate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {/* Footer */}
      </div>
    </>
  );
}

export default App;
