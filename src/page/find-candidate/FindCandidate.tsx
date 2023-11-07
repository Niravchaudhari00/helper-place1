import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import OrderByAndFilter from "../../components/OrderByAndFilter";
import FilterSection from "../../components/filter/FilterSection";
import axiosInstance from "../../service/axiosInstance";

const FindCandidate = () => {
  const [masterDataJson, setMasterDataJson] = useState<any | null>(null);

  const [filterOpenModal, setFilterOpenModal] = useState<boolean>(false);
  const handleOpenFilterModal = (x: boolean) => {
    setFilterOpenModal(x);
  };

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

  return (
    <div>
      <div>
        <Banner />
      </div>
      <OrderByAndFilter handleOpenFilterModal={handleOpenFilterModal} />
      <div className="w-11/12 gap-x-5 flex justify-start lg:justify-between mx-auto">
        {masterDataJson && (
          <FilterSection
            filterOpenModal={filterOpenModal}
            handleOpenFilterModal={handleOpenFilterModal}
            masterDataJson={masterDataJson}
          />
        )}
      </div>
    </div>
  );
};

export default FindCandidate;
