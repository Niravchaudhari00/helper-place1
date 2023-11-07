import { ImLocation } from "react-icons/im";
import { BiSolidCircle, BiSolidBadge } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { Avatar, Skeleton } from "@mui/material";

interface PropType {
  candidateData: any;
  masterData: any;
  loading: boolean;
}
const CandidateCart = (props: PropType) => {
  const { candidateData, masterData, loading } = props;

  const formateDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const jobPositionValue = (positionId: number) => {
    let pst = masterData.job_position?.find(
      (data: any) => data.job_position_id === positionId
    );
    return pst?.position_name;
  };

  const contractSts = (contractId: number) => {
    let cst = masterData.contract_status?.find(
      (data: any) => data.contract_sts_id === contractId
    );
    return cst?.contract_sts_name;
  };

  const canLocation = (id: number) => {
    let canLn = masterData.candidate_country?.find(
      (data: any) => data.country_id === id
    );
    return canLn?.location_name;
  };

  const jobType = (id: number) => {
    let jbType = masterData.job_type?.find(
      (data: any) => data.job_type_id === id
    );
    return jbType?.job_type_name;
  };
  return (
    <div>
      {candidateData?.length <= 0 ? (
        <div className="h-screen lg:w-[1000px] p-10 my-10 lg:mx-auto border border-black  flex justify-center items-center">
          <h1>NO DATA Here</h1>
        </div>
      ) : (
        <>
          {candidateData?.map((data: any, i: number) => (
            <div
              key={i}
              className="lg:w-full flex lg:justify-between pb-3  gap-x-3 lg:gap-x-1 my-10 border shadow rounded-lg shadow-black-50/20"
            >
              <div className="flex flex-col items-center lg:justify-between lg:px-2 pt-5 gap-y-5 ">
                {loading ? (
                  <Skeleton width={120} height={120} variant="circular">
                    <Avatar />
                  </Skeleton>
                ) : (
                  <>
                    <img
                      src={data?.profile_photo}
                      alt="candidate-image"
                      width={100}
                      height={100}
                      className="lg:w-[120px] lg:h-[120px] border border-gray-300 rounded-full aspect-square object-cover"
                    />
                  </>
                )}

                {loading ? (
                  <Skeleton
                    sx={{
                      height: "50px",
                      width: "150px",
                    }}
                    animation="wave"
                  />
                ) : (
                  <div
                    id="pointer"
                    className="w-[100px] lg:w-[120px]
                h-[30px] border-b-2 self-end border-yellowbtn flex justify-around items-center text-white font-semibold"
                  >
                    <span>{data?.resume_manager}</span>
                  </div>
                )}
              </div>

              <div className="pt-5 pr-2 flex flex-col lg:px-1">
                {loading ? (
                  <Skeleton height={40} width={150} animation="wave" />
                ) : (
                  <>
                    <p className="text-blue-900 font-bold lg:font-semibold text-lg lg:text-2xl">
                      {data?.helper_name} - {data?.age}yr
                    </p>
                  </>
                )}
                <div className="mt-2 lg:flex gap-x-1">
                  {loading ? (
                    <Skeleton height={30} width={350} animation="wave" />
                  ) : (
                    <p className="space-x-2 text-gray-500 font-semibold lg:text-lg">
                      <span>{jobPositionValue(data.position_id)}</span>
                      <span>-</span>
                      <span>{contractSts(data.contract_status_id)}</span>
                    </p>
                  )}
                  <div className="text-sm font-bold lg:font-semibold lg:text-lg flex items-center gap-1 ">
                    {loading ? (
                      <Skeleton height={30} width={100} animation="wave" />
                    ) : (
                      <>
                        <span className="inline-block text-green-400">
                          <ImLocation />
                        </span>
                        {/* location */}
                        <span className="text-blue-900">
                          {canLocation(data.current_country_id)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      height={20}
                      width={600}
                      animation="wave"
                    />
                  ))
                ) : (
                  <p className="hidden sm:inline-block text-gray-500 mt-2">
                    {data?.meta_data}
                  </p>
                )}

                {/* improve no repeat under the code using store the value in array and using arram method print*/}
                <ul className="list-outside flex flex-wrap lg:mt-11 gap-x-3">
                  {loading ? (
                    <Skeleton height={40} width={450} animation="wave" />
                  ) : (
                    <>
                      <li className="text-style">
                        <span className="text-green-400">
                          <BiSolidBadge />
                        </span>
                        <p>{data?.experience_year}yr experience</p>
                      </li>

                      <li className="text-style">
                        <span className="text-green-400">
                          <FaCalendarDays />
                        </span>
                        <p className="space-x-2">
                          <span>
                            Form {formateDate(data.next_job_available_date)}
                          </span>
                          <span>|</span>
                          <span>{jobType(data.job_type_id)}</span>
                        </p>
                      </li>
                      <li className="text-style">
                        <span className="text-green-400 bg">
                          <BiSolidCircle />
                        </span>
                        <p>Very Active</p>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default CandidateCart;
