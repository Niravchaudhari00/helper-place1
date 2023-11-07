import { Slider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { BiReset } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { createSearchParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../../service/axiosInstance";
import { ResumeType, gender_data, resume_type } from "../../utils/data";
import { formateValue } from "../../utils/formateName";
import CandidateCart from "../CandidateCart";
import FormRadio from "./FormRadio";
import FormSelect from "./FormSelect";
import SelecteDate from "./SelecteDate";
import Paginate from "./Paginate";
import d from "lodash";

const finCandidatedUrl: string = `https://api2.helperplace.com/mobile/candidate/FindCandidate`;

interface PropsType {
  filterOpenModal: boolean;
  handleOpenFilterModal: (x: boolean) => void;
  masterDataJson: any;
}

const FilterSection = (props: PropsType) => {
  // Props Value
  const { filterOpenModal, handleOpenFilterModal, masterDataJson } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [candidateData, setCandidateData] = useState<any[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>();
  // +++++++++++++++++++++++++++++++++++++++++++++++++++
  const [loading, setLoading] = useState<boolean>(false);
  const [exprince, setExprice] = useState<number[]>([0, 40]);
  const [age, setAge] = useState<number[]>([18, 60]);
  const [jobPosition, setJobPosition] = useState<any[]>([]);
  const [jobType, setJobType] = useState<any[]>([]);
  const [date, setDate] = useState<Date | string>();
  const [gender, setGender] = useState<string>();
  const [postManager, setPostManager] = useState<string>();
  const [candidateLocation, setCandidateLocation] = useState<any[]>([]);
  const [contractSts, setContractSts] = useState<any[]>([]);
  const [nationality, setNationality] = useState<any[]>([]);
  const [Langskill, setLangSkill] = useState<any[]>([]);
  const [mainskill, setMainSkill] = useState<any[]>([]);
  const [page, setPage] = useState<any>(1);
  const [orderBy, setOrderBy] = useState<string>("");
  const [searchHelperName, setSearchHelperName] = useState<string>("");

  const searchValue = d.debounce((name: string) => {
    return name ? name : "";
  }, 1000);

  const handlerQueryParams = (key: string, value: any) => {
    if (value) {
      let params = new URLSearchParams(searchParams);
      params.set(key, value);
      setSearchParams(params);
    } else {
      let params = new URLSearchParams(searchParams);
      params.delete(key);
      setSearchParams(params);
    }
  };

  // setPosition Value
  const setJPositionValue = (jobPvalue: any) => {
    let jobPstnValue = masterDataJson.job_position.filter(
      (data: any) => data.position_name === jobPvalue
    );
    jobPstnValue ? setJobPosition(jobPstnValue) : setJobPosition([]);
  };

  // setJobType value
  const setJobTypeValue = (jobTypeValue: any) => {
    if (jobTypeValue) {
      let jType = masterDataJson.job_type.filter(
        (data: any) => data.job_type_name == jobTypeValue
      );
      setJobType(jType);
    } else {
      setJobType([]);
    }
  };

  // getSearchParams
  const getSearchParamsValue = (key: string) => {
    let value = searchParams.get(key);
    if (value) return value;
  };

  //Fetch Findcandidate Data
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${finCandidatedUrl}/${generateQuery()}`
        );

        setCandidateData(response.data.data);
        setTotalRecord(response.data.records_total);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [
    jobPosition,
    date,
    exprince,
    age,
    jobType,
    candidateLocation,
    gender,
    postManager,
    contractSts,
    orderBy,
    nationality,
    page,
    Langskill,
    mainskill,
  ]);

  useEffect(() => {
    // order by value
    let orderByValue = getSearchParamsValue("order_by");
    orderByValue ? setOrderBy(orderByValue) : setOrderBy("");

    let jPosition = getSearchParamsValue("job_position")?.split("-").join(" ");
    jPosition ? setJPositionValue(jPosition) : setJPositionValue([]);

    let getDate = getSearchParamsValue("start_date");
    getDate ? setDate(getDate) : setDate("");

    // candidate location
    let cLocation = getSearchParamsValue("country");
    if (cLocation) {
      let locationValue: string[] = cLocation.split("-").join(" ").split(",");
      setCandidateLocation(
        masterDataJson?.candidate_country?.filter((item: any) =>
          locationValue.includes(item.country_name)
        )
      );
    } else {
      setCandidateLocation([]);
    }

    let jobType = getSearchParamsValue("job_type")?.split("-").join(" ");
    jobType ? setJobTypeValue(jobType) : setJobTypeValue([]);

    // constract sts
    let cStatus = getSearchParamsValue("contract_status");
    if (cStatus) {
      let cStsValue: string[] = cStatus.split("-").join(" ").split(",");
      setContractSts(
        masterDataJson?.contract_status?.filter((item: any) =>
          cStsValue.includes(item.contract_sts_name)
        )
      );
    } else {
      setContractSts([]);
    }

    // resume type
    let resumeType = getSearchParamsValue("post_manager");
    resumeType ? setPostManager(resumeType) : setPostManager("");

    let getExprince = getSearchParamsValue("experience_range");
    let exValue: number[] = getExprince
      ? getExprince?.split("-").join().split(",").map(Number)
      : [0, 40];
    setExprice(exValue);

    // language skill
    let cLangauge = getSearchParamsValue("Language");
    if (cLangauge) {
      let cLangvalue: string[] = cLangauge.split("-").join(" ").split(",");
      setLangSkill(
        masterDataJson?.skills.filter((lan: any) =>
          cLangvalue.includes(lan.skill_name)
        )
      );
    } else {
      setLangSkill([]);
    }

    // main skill
    let cMainSkill = getSearchParamsValue("Main-Skills");
    if (cMainSkill) {
      let cMainvalue: string[] = cMainSkill.split("-").join(" ").split(",");
      setMainSkill(
        masterDataJson?.skills.filter((skillId: any) =>
          cMainvalue.includes(skillId.skill_name)
        )
      );
    } else {
      setMainSkill([]);
    }

    // nationality
    let cNantionality = getSearchParamsValue("nationality");
    if (cNantionality) {
      console.log("true: ", cNantionality);
      setNationality(
        masterDataJson.nationality?.filter(
          (data: any) => data.nationality_name === cNantionality
        )
      );
    } else {
      setNationality([]);
    }

    let gender = getSearchParamsValue("gender");
    gender ? setGender(gender) : setGender("");

    let getAge = getSearchParamsValue("age_range");
    let ageValue: number[] = getAge
      ? getAge?.split("-").join().split(",").map(Number)
      : [18, 60];
    setAge(ageValue);

    // search
    let name = getSearchParamsValue("name");
    if (name) {
      setSearchHelperName(name);
    } else {
      setSearchHelperName("");
    }

    // page
    let page = getSearchParamsValue("page");
    page ? setPage(Number(page)) : setPage(1);
  }, [searchParams]);

  const handleGetJobPositionValue = (jbPositionValue: string) => {
    handlerQueryParams("job_position", jbPositionValue.split(" ").join("-"));
  };

  // Date
  const handleDateChange = (date: Date | string) => {
    handlerQueryParams("start_date", date.toString());
  };

  // Job Type
  const handleGetJoBTypeValue = (jobType: any) => {
    handlerQueryParams("job_type", jobType.split(" ").join("-"));
  };

  // Resume Type
  const handleGetResumeTypeValue = (postManager: string) => {
    handlerQueryParams("post_manager", postManager);
  };

  // gender
  const handleGetGenderValue = (genderValue: string) => {
    handlerQueryParams("gender", genderValue);
  };

  // Expirnce
  const handleChangeExp = (event: Event, newValue: number | number[]) => {
    let value = newValue as number[];
    if (value)
      handlerQueryParams(
        "experience_range",
        value.join(" ").split(" ").join("-").toString()
      );
  };

  // Age
  const handleChangeAge = (event: Event, newValue: number | number[]) => {
    let ageValue = newValue as number[];
    if (ageValue)
      handlerQueryParams(
        "age_range",
        ageValue.join(" ").split(" ").join("-").toString()
      );
  };

  // nationality
  const nationalityOpationValue = (nationalityValue: any) => {
    if (nationalityValue) {
      handlerQueryParams("nationality", nationalityValue);
    } else {
      handlerQueryParams("nationality", "");
    }
  };

  const handleSetOptionValue = (selectedData: any[], selectType: string) => {
    switch (selectType) {
      case "CANDIDATE": {
        let candidateValue = masterDataJson?.candidate_country?.filter(
          (item: any) => selectedData.includes(item.country_name)
        );
        handlerQueryParams(
          "country",
          formateValue(candidateValue.map((data: any) => data.country_name))
        );
        break;
      }

      case "CONTRACT_STS": {
        let contractStsValue = masterDataJson?.contract_status?.filter(
          (item: any) => selectedData.includes(item.contract_sts_name)
        );
        handlerQueryParams(
          "contract_status",
          formateValue(
            contractStsValue.map((data: any) => data.contract_sts_name)
          )
        );
        break;
      }

      case "LANGUAGE": {
        let languageDataValue = masterDataJson?.skills.filter((lan: any) =>
          selectedData.includes(lan.skill_name)
        );
        handlerQueryParams(
          "Language",
          formateValue(languageDataValue.map((data: any) => data.skill_name))
        );
        break;
      }

      case "MAIN_SKILL": {
        let mainSkill = masterDataJson?.skills.filter((skillId: any) =>
          selectedData.includes(skillId.skill_name)
        );
        handlerQueryParams(
          "Main-Skills",
          formateValue(mainSkill.map((data: any) => data.skill_name))
        );
        break;
      }
    }
  };

  // QUERY
  const generateQuery = () => {
    let obj = {
      start: page - 1,
      length: 20,

      helper_name: searchHelperName && searchHelperName,
      start_date: date ? date : "",
      job_type_id: jobType.length > 0 ? jobType[0]?.job_type_id : "",
      country_id: candidateLocation
        ? candidateLocation.map((conId) => conId.country_id).join(",")
        : "",
      position_id:
        jobPosition.length > 0 ? jobPosition[0]?.job_position_id : "",
      nationality_id:
        nationality.length > 0 ? nationality[0]?.nationality_id : "",
      edu_id: "",
      contract_status_id: contractSts
        ? contractSts.map((contSts) => contSts.contract_sts_id).join(",")
        : "",
      resume_manager: postManager ? postManager : "",
      gender: gender ? gender : "",
      age_min: age && age[0],
      age_max: age && age[1],
      experience_min: exprince && exprince[0],
      experience_max: exprince && exprince[1],
      marital_status: "",
      order_by: orderBy,
      location_order: 0,
      lang: "en",
    };

    let query = "?";
    for (const [key, value] of Object.entries(obj)) {
      query += `${key}=${value}&`;
    }

    let skillQry = "";
    Langskill.forEach((id) => {
      skillQry += `skill_id=${id.skill_id}&`;
    });

    mainskill.forEach((id) => {
      skillQry += `skill_id=${id.skill_id}&`;
    });

    query += skillQry;
    query = query.slice(0, -1);
    return query;
  };

  // Reset
  const handleReset = () => {
    setSearchParams(createSearchParams({ page: page }));
    setPage(1);
  };

  const handlePageChang = (page: number) => {
    handlerQueryParams("page", page);
  };

  // search
  const debounceSearch = d.debounce((name: string) => {
    handlerQueryParams("name", name);
  }, 1000);

  return (
    <div>
      <div className="w-full flex gap-x-5 relative">
        <div
          className={`${
            filterOpenModal
              ? "py-10 fixed inset-0 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-5 backdrop-blur-sm z-[1000]"
              : "hidden lg:block"
          }`}
        >
          <div
            className={`${
              filterOpenModal
                ? ` sm:w-[500px] w-[320px]  shadow rounded-lg bg-white p-5 px-7 lg:px-5 border border-gray-400`
                : "p-5 border border-gray-400 lg:w-[350px] my-10 shadow rounded-lg bg-bannerBgColor"
            }`}
          >
            {filterOpenModal && (
              <div className="h-[40px] flex items-center justify-between  mb-4 font-semibold text-2xl border-b-[.2rem] border-yellowbtn">
                <h1 className="text-blue-900">Filter</h1>
                <span onClick={() => handleOpenFilterModal(false)}>
                  <RxCross2 />
                </span>
              </div>
            )}

            <h1 className="text-2xl text-blue-900">I'm Looking For</h1>
            {!filterOpenModal && (
              <div className="flex justify-between mt-5 text-lg font-semibold">
                <p className="text-blue-900">Filter</p>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-1 text-greenbtn "
                >
                  <span>
                    <BiReset />
                  </span>
                  Reset
                </button>
              </div>
            )}

            <div className="mt-2">
              {/* JOB POSITION */}
              <div>
                <h2 className="border-b-[0.2rem] pb-1 border-greenbtn text-blue-900 font-semibold">
                  Job Postion
                </h2>
                <div className="my-2">
                  {masterDataJson.job_position.map((data: any) => {
                    return (
                      <FormRadio
                        key={data.job_position_id}
                        name="job_position"
                        value={data.position_name}
                        paramsValue={getSearchParamsValue("job_position")}
                        handleGetValue={handleGetJobPositionValue}
                      />
                    );
                  })}
                </div>
              </div>
              {/* DATE */}
              <SelecteDate value={date} handleDateChange={handleDateChange} />

              {/* CANDIDATE LOCATION */}
              <FormSelect
                type="CANDIDATE"
                title="Candidate Location"
                placeholder="Candidate Location"
                option={masterDataJson?.candidate_country}
                handleOptionValue={handleSetOptionValue}
                selectedValue={candidateLocation}
              />
              {/* JOB TYPE */}
              <div>
                <h2 className="border-b-[0.2rem] pb-1 border-greenbtn text-blue-900 font-semibold">
                  Job Type
                </h2>
                <div className="my-2">
                  {masterDataJson.job_type.map((data: any) => (
                    <FormRadio
                      key={data.job_type_id}
                      name="job_type"
                      value={data.job_type_name}
                      handleGetValue={handleGetJoBTypeValue}
                      paramsValue={getSearchParamsValue("job_type")}
                    />
                  ))}
                </div>
              </div>

              {/* CONTRACT STS */}
              <FormSelect
                type="CONTRACT_STS"
                title="Contract Status"
                placeholder="Contract Status"
                option={masterDataJson?.contract_status}
                handleOptionValue={handleSetOptionValue}
                selectedValue={contractSts}
              />

              {/* RESUME TYPE */}
              <div>
                <h2 className="border-b-[0.2rem] pb-1 border-greenbtn text-blue-900 font-semibold">
                  Resume Type
                </h2>
                <div className="my-2">
                  {resume_type.map((data: ResumeType) => (
                    <FormRadio
                      key={data.resume_type_id}
                      name="resume_type"
                      value={data.resume_type_name}
                      handleGetValue={handleGetResumeTypeValue}
                      paramsValue={getSearchParamsValue("post_manager")}
                    />
                  ))}
                </div>
              </div>

              {/* WORKING EXP */}
              <div className="mt-5">
                <h1 className="border-b-[0.2rem] pb-1 border-greenbtn text-blue-900 font-semibold">
                  Working Experience
                </h1>
                <div className="my-2">
                  <div className="flex justify-between">
                    <span>{exprince[0]}</span>
                    <span>{exprince[1]}</span>
                  </div>
                  <div className="px-1">
                    <Slider
                      min={0}
                      max={40}
                      value={exprince}
                      onChange={handleChangeExp}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </div>
              </div>

              {/* LANG */}
              <FormSelect
                type="LANGUAGE"
                title="Language"
                placeholder="Search"
                option={masterDataJson}
                handleOptionValue={handleSetOptionValue}
                selectedValue={Langskill}
              />

              {/* MAIN SKILL  */}
              <FormSelect
                type="MAIN_SKILL"
                title="Main Skill"
                placeholder="Search"
                option={masterDataJson}
                handleOptionValue={handleSetOptionValue}
                selectedValue={mainskill}
              />

              {/*  NATIONALITY */}

              <div className="space-y-1 my-2">
                <h2 className="text-blue-900 font-semibold ">Nationality</h2>
                <select
                  value={nationality[0]?.nationality_name || ""}
                  onChange={(e: any) => nationalityOpationValue(e.target.value)}
                  className="w-full text-sm px-1 py-[0.4rem] border border-gray-300 outline-[2px] outline-blue-500 rounded-md"
                >
                  <option value={""}>Any Nationality</option>
                  {masterDataJson?.nationality.map((data: any) => {
                    return (
                      <option
                        key={data.nationality_id}
                        value={data.nationality_name}
                      >
                        {data.nationality_name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* GEN */}
              <div>
                <h2 className="border-b-[0.2rem] pb-1 border-greenbtn text-blue-900 font-semibold">
                  Gender
                </h2>
                <div className="my-2">
                  {gender_data.map((data: any) => (
                    <FormRadio
                      key={data.id}
                      name="gender"
                      value={data.value}
                      handleGetValue={handleGetGenderValue}
                      paramsValue={getSearchParamsValue("gender")}
                    />
                  ))}
                </div>
              </div>

              {/* AGE */}
              <div className="mt-5">
                <h1 className="border-b-[0.2rem] pb-1 border-greenbtn text-blue-900 font-semibold">
                  Age
                </h1>
                <div className="my-2">
                  <div className="flex justify-between">
                    <span>{age[0]}</span>
                    <span>{age[1]}</span>
                  </div>
                  <div className="px-1">
                    <Slider
                      min={18}
                      max={60}
                      value={age}
                      onChange={handleChangeAge}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </div>
              </div>

              {/* HELPER NAME */}
              <div className="space-y-1 my-2">
                <h2 className="text-blue-900 font-semibold ">Helper Name</h2>
                <input
                  value={searchValue(searchHelperName)}
                  onChange={(e: any) => debounceSearch(e.target.value)}
                  className="w-full text-sm px-1 py-[0.4rem] border border-gray-300 outline-[2px] outline-blue-500 rounded-md"
                  type="text"
                  placeholder="Search With Helper Name"
                />
              </div>
            </div>
            {filterOpenModal && (
              <div className="mt-5 flex gap-x-3 justify-end">
                <button onClick={handleReset} className="btn-style bg-greenbtn">
                  Reset
                </button>
                <button
                  onClick={() => handleOpenFilterModal(false)}
                  className="btn-style bg-yellowbtn"
                >
                  Ok
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <CandidateCart
            loading={loading}
            candidateData={candidateData}
            masterData={masterDataJson}
          />
          <Paginate
            pageCount={totalRecord}
            handlePageChange={handlePageChang}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};
export default FilterSection;
