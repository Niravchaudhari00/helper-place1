import Banner from "../../components/Banner";
import CandidateCart from "../../components/CandidateCart";
import FilterSection from "../../components/filter/FilterSection";
import OrderByAndFilter from "../../components/OrderByAndFilter";

const Home = () => {
  return (
    <div className="">
      <Banner />
      {/* <OrderByAndFilter /> */}
      <div className="w-11/12 gap-x-5 flex justify-start lg:justify-between mx-auto">
        {/* <FilterSection /> */}

        <CandidateCart />
      </div>
    </div>
  );
};

export default Home;
