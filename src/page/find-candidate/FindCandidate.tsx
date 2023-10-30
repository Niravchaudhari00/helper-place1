import { useState } from "react";
import Banner from "../../components/Banner";
import OrderByAndFilter from "../../components/OrderByAndFilter";
import FilterSection from "../../components/filter/FilterSection";
import CandidateCart from "../../components/CandidateCart";

const FindCandidate = () => {
  const [filterOpenModal, setFilterOpenModal] = useState<boolean>(false);

  const handleFilterOpenModal = (x: boolean) => {
    console.log(`filter : `, x);
    setFilterOpenModal(x);
  };
  return (
    <div>
      <div>
        <Banner />
      </div>
      <OrderByAndFilter handleFilterOpenModal={handleFilterOpenModal} />
      <div className="w-11/12 gap-x-5 flex justify-start lg:justify-between mx-auto">
        <FilterSection
          filterOpenModal={filterOpenModal}
          handleFilterOpenModal={handleFilterOpenModal}
        />

        <CandidateCart />
      </div>
    </div>
  );
};

export default FindCandidate;
