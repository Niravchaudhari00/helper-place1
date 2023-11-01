import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import OrderByAndFilter from "../../components/OrderByAndFilter";
import FilterSection from "../../components/filter/FilterSection";
import CandidateCart from "../../components/CandidateCart";
import axiosInstance from "../../service/axiosInstance";

const FindCandidate = () => {
  const [filterOpenModal, setFilterOpenModal] = useState<boolean>(false);
  const handleOpenFilterModal = (x: boolean) => {
    setFilterOpenModal(x);
  };
  const [orderBy, setOrderBy] = useState<string>("Last Active");
  const [masterDataJson, setMasterDataJson] = useState<any | null>(null);

  useEffect(() => {
    const getAllMasterDataJson = async () => {
      try {
        const response = await axiosInstance.get("/GetAllMasterDataJson");
        if (response.data.success) {
          handleMasterDataJsonStore(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllMasterDataJson();
  }, []);

  const handleMasterDataJsonStore = (masterData: any) => {
    setMasterDataJson(masterData);
  };

  const handleSetOrderByValue = (value: any) => {
    setOrderBy(value);
  };

  return (
    <div>
      <div>
        <Banner />
      </div>
      <OrderByAndFilter
        handleOpenFilterModal={handleOpenFilterModal}
        handleSetOrderByValue={handleSetOrderByValue}
        orderBy={orderBy}
      />
      <div className="w-11/12 gap-x-5 flex justify-start lg:justify-between mx-auto">
        {masterDataJson && (
          <FilterSection
            filterOpenModal={filterOpenModal}
            handleOpenFilterModal={handleOpenFilterModal}
            masterDataJson={masterDataJson}
            orderBy={orderBy}
          />
        )}
        {/* <CandidateCart candidateData={candidateData} /> */}
      </div>
    </div>
  );
};

export default FindCandidate;
