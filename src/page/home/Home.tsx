import { AnimatePresence } from "framer-motion";
import Banner from "../../components/Banner";
import LogoStype from "../../components/LogoStype";
import Form from "../../components/Form";

const Home = () => {
  return (
    <div className="">
      <Banner />
      {/* <OrderByAndFilter /> */}
      {/* <AnimatePresence>
        <LogoStype key="dialog" />
      </AnimatePresence> */}

      <Form />
    </div>
  );
};

export default Home;
