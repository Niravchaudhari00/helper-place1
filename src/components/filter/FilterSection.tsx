import { BiReset } from "react-icons/bi";
import FormSelect from "./FormSelect";
import { useEffect, useState } from "react";
import FormRadio from "./FormRadio";
import SelecteDate from "./SelecteDate";
import { RxCross2 } from "react-icons/rx";
import { ResumeType, gender_data, resume_type } from "../../utils/data";
import { Slider } from "@mui/material";
import axiosInstance from "../../service/axiosInstance";
import CandidateCart from "../CandidateCart";

const finCandidatedUrl: string = `https://api2.helperplace.com/mobile/candidate/FindCandidate`;

// job_pos

interface PropsType {
  filterOpenModal: boolean;
  handleOpenFilterModal: (x: boolean) => void;
  masterDataJson: any;
  orderBy: string | undefined;
}

const FilterSection = (props: PropsType) => {
  const { filterOpenModal, handleOpenFilterModal, masterDataJson, orderBy } =
    props;

  const [jopPosition, setJobPosition] = useState<any[]>();
  const [jopType, setJobType] = useState<any[]>();
  const [candidateLocation, setCandidateLocation] = useState();
  const [contractSts, setContractSts] = useState();
  const [language, setLangauge] = useState();
  const [nationality, setNationality] = useState();
  const [exprince, setExprice] = useState<number[]>([0, 40]);
  const [age, setAge] = useState<number[]>([18, 60]);
  const [searchHelperName, setSearchHelperName] = useState<string>("");
  const [gender, setGender] = useState<string>();
  const [mainSkill, setMainSkill] = useState();
  const [date, setDate] = useState<Date>();
  const [postManager, setPostManager] = useState<string>();
  const [candidateData, setCandidateData] = useState<any[]>([]);
  // Job Position
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  // findCandidate Data
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(
          `${finCandidatedUrl}/${generateQuery()}`
        );
        setCandidateData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [
    selectedOptions,
    postManager,
    date,
    mainSkill,
    gender,
    searchHelperName,
    age,
    exprince,
    nationality,
    language,
    contractSts,
    candidateLocation,
    jopType,
    jopPosition,
    orderBy,
  ]);

  const handleGetJobPositionValue = (id: number) => {
    let jobPstnValue = masterDataJson.job_position.filter(
      (data: any) => data.job_position_id == id
    );
    if (jobPstnValue) setJobPosition(jobPstnValue);
  };
  // Date
  const handleDateChange = (date: Date) => {
    setDate(date);
  };
  // Job Type
  const handleGetJoBTypeValue = (id: number) => {
    let jobType = masterDataJson.job_type.filter(
      (data: any) => data.job_type_id == id
    );
    if (jobType) setJobType(jobType);
  };
  // Resume Type
  const handleGetResumeTypeValue = (postManager: string) => {
    setPostManager(postManager);
  };

  // gender
  const handleGetGenderValue = (genderValue: string) => {
    setGender(genderValue);
  };

  // main skill
  useEffect(() => {
    let mainSkill = masterDataJson.skill_category.filter(
      (data: any) => data.skill_category_name === "Main Skills"
    );
    let skill = masterDataJson.skills.filter(
      (data: any) =>
        data.skill_category_id === 4 && mainSkill[0].skill_category_id === 4
    );
    let mainSkillOpt = skill.map((data: any) => {
      return { value: data.skill_id, label: data.skill_name };
    });
    setMainSkill(mainSkillOpt);
  }, []);

  // cadidate
  useEffect(() => {
    let candidateOtp = masterDataJson?.candidate_country.map((data: any) => {
      return { value: data.country_id, label: data.country_name };
    });
    setCandidateLocation(candidateOtp);
  }, []);

  // contract-status
  useEffect(() => {
    let contractStatusOpt = masterDataJson?.contract_status.map((data: any) => {
      return { value: data.contract_sts_id, label: data.contract_sts_name };
    });
    setContractSts(contractStatusOpt);
  }, []);

  // language
  useEffect(() => {
    let languageOpt = masterDataJson?.language.map((data: any) => {
      return { value: data.language_id, label: data.language_name };
    });
    setLangauge(languageOpt);
  }, []);

  // Expirnce
  const handleChangeExp = (event: Event, newValue: number | number[]) => {
    setExprice(newValue as number[]);
  };

  // Age
  const handleChangeAge = (event: Event, newValue: number | number[]) => {
    setAge(newValue as number[]);
  };

  // Reset
  const handleReset = () => {};

  // Option value
  const handleOptionValue = (data: any[]) => {
    setSelectedOptions(data);
  };
  // QUERY
  const generateQuery = () => {
    let obj = {
      start: 0,
      length: 20,
      helper_name: searchHelperName,
      start_date: date ? date : "",
      job_type_id: jopType ? jopType[0]?.job_type_id : "",
      country_id: selectedOptions ? selectedOptions.join(",") : "",
      position_id: jopPosition ? jopPosition[0]?.job_position_id : "",
      nationality_id: selectedOptions ? selectedOptions.join(",") : "",
      edu_id: "",
      contract_status_id: selectedOptions ? selectedOptions.join(",") : "",
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
    query = query.slice(0, -1);
    return query;
  };

  return (
    <div className="w-full flex gap-x-5">
      <div
        className={`${
          filterOpenModal
            ? "fixed inset-0 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-5 backdrop-blur-sm z-[1000]"
            : "hidden lg:block"
        }`}
      >
        <div
          className={`${
            filterOpenModal
              ? `sm:w-[500px] w-[320px]  shadow rounded-lg bg-white p-5 border border-gray-400`
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

          <h1 className="text-2xl text-blue-900"> I'm Looking For</h1>
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
                      title={data.position_name}
                      value={data.job_position_id}
                      handleGetValue={handleGetJobPositionValue}
                    />
                  );
                })}
              </div>
            </div>

            {/* DATE */}
            <SelecteDate handleDateChange={handleDateChange} />

            {/* CANDIDATE LOCATION */}
            <FormSelect
              title="Candidate Location"
              placeholder="Candidate Location"
              option={candidateLocation}
              handleOptionValue={handleOptionValue}
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
                    title={data.job_type_name}
                    value={data.job_type_id}
                    handleGetValue={handleGetJoBTypeValue}
                  />
                ))}
              </div>
            </div>

            {/* CONTRACT STS */}
            <FormSelect
              title="Contract Status"
              placeholder="Contract Status"
              option={contractSts}
              handleOptionValue={handleOptionValue}
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
                    title={data.resume_type_name}
                    value={data.resume_type_name}
                    handleGetValue={handleGetResumeTypeValue}
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
                  <span>0</span>
                  <span>40</span>
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
              title="Language"
              placeholder="Search"
              option={language}
              handleOptionValue={handleOptionValue}
            />

            {/* MAIN SKILL  */}
            <FormSelect
              title="Main Skill"
              placeholder="Search"
              option={mainSkill}
              handleOptionValue={handleOptionValue}
            />

            {/*  NATIONALITY */}
            <div className="space-y-1 my-2">
              <h2 className="text-blue-900 font-semibold ">Nationality</h2>
              <select
                value={nationality}
                onChange={(e: any) => setNationality(e.target.value)}
                className="w-full text-sm px-1 py-[0.4rem] border border-gray-300 outline-[2px] outline-blue-500 rounded-md"
              >
                <option>Any Nationality</option>
                {masterDataJson?.nationality.map((data: any) => {
                  return (
                    <option
                      key={data.nationality_id}
                      value={data.nationality_id}
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
                    title={data.value}
                    value={data.value}
                    handleGetValue={handleGetGenderValue}
                  />
                ))}
              </div>
            </div>

            {/* AGE */}
            <div className="mt-5">
              <h1 className="border-b-[0.2rem] pb-1 border-greenbtn text-blue-900 font-semibold">
                Working Experience
              </h1>
              <div className="my-2">
                <div className="flex justify-between">
                  <span>18</span>
                  <span>60</span>
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
                onChange={(e: any) => setSearchHelperName(e.target.value)}
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
      <CandidateCart
        candidateData={candidateData}
        masterData={masterDataJson}
      />
    </div>
  );
};

export default FilterSection;
