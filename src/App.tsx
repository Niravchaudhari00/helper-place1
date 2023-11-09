import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import GotoTop from "./components/filter/GotoTop";
import NotFound from "./page/NotFound";
import { Suspense, lazy } from "react";
import { motion, useScroll } from "framer-motion";

const Home = lazy(() => import("./page/home/Home"));
const FindCandidate = lazy(() => import("./page/find-candidate/FindCandidate"));

function App() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="">
        <Navbar />
        {/* Routes */}
        <div>
          <Suspense fallback={<p>Loading....</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route index path="find-candidate" element={<FindCandidate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>

        <div>
          <GotoTop />
        </div>
        {/* Footer */}
      </div>
    </>
  );
}

export default App;
