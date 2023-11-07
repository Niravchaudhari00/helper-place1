import React, { useEffect } from "react";

const useQueryParams = () => {
  useEffect(() => {
    jopPosition &&
      handlerQueryParams(
        "job_position",
        jopPosition?.find((data) => data.position_name).position_name
      );

    date && handlerQueryParams("start_date", date.toString());
    jopType &&
      handlerQueryParams(
        "job_type",
        jopType.find((data) => data.job_type_name).job_type_name
      );

    candidateLocation.length > 0 &&
      handlerQueryParams(
        "country",
        candidateLocation
          .map((data) => data.country_name)
          .join(",")
          .toString()
      );
    contractSts.length > 0 &&
      handlerQueryParams(
        "contract_status",
        contractSts
          .map((data) => data.contract_sts_name)
          .join(",")
          .toString()
      );
  }, [jopPosition, date, jopType, candidateLocation, contractSts]);
  return;
};

export default useQueryParams;
