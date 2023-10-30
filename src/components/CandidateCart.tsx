import { ImLocation } from "react-icons/im";
import { BiSolidCircle, BiSolidBadge } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";

// interface propsType{
//        name:string;
//        heading:string;
//        description:string

// }
const CandidateCart = () => {
  return (
    <div>
      <div className="lg:w-full flex lg:justify-around pb-3 gap-x-1 my-10 border shadow rounded-lg shadow-black-50/20">
        <div className="flex flex-col items-center lg:justify-between lg:px-2 pt-5 gap-y-5 ">
          <img
            src="https://imgs.search.brave.com/_WeRILENZZFx6eKV9kucdS5BKhWdlAmvtWsy2flVs8o/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/NzE1OTM2NS9waG90/by9wb3J0cmFpdC1v/Zi15b3VuZy1zbWls/aW5nLXdvbWFuLWZh/Y2UtcGFydGlhbGx5/LWNvdmVyZWQtd2l0/aC1mbHlpbmctaGFp/ci1pbi13aW5keS1k/YXktc3RhbmRpbmcu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUkxNmNfWnpRSEVl/R29QVVZyVlA5cFB1/c1N6c215bXZWS2RR/VmdQdVZkRG89"
            alt="candidate-image"
            width={120}
            height={120}
            className="lg:w-[150px] lg:h-[150px]  border border-gray-300 rounded-full aspect-square object-cover"
          />

          <div
            id="pointer"
            className="border-b-2 self-end border-yellowbtn flex justify-around items-center text-white font-semibold"
          >
            <span>Direct</span>
          </div>
        </div>

        <div className="pt-5 pr-2 flex flex-col lg:px-1">
          <p className="text-blue-900 font-bold lg:font-semibold text-lg lg:text-2xl">
            Jocelyn - 47yr
          </p>
          <div className="mt-2 lg:flex gap-x-1">
            <p className="inline-block  text-gray-500 font-semibold lg:text-lg">
              Domestic Helper - Finished Contract
            </p>
            <div className="text-sm font-bold lg:font-semibold lg:text-lg flex items-center gap-1 ">
              <span className="inline-block text-green-400">
                <ImLocation />
              </span>
              <span className="text-blue-900">Saudi Arabia</span>
            </div>
          </div>
          <p className="hidden sm:inline-block text-gray-500 mt-2">
            I am Jocelyn, 47 years old, separated, and have 5 children. I am
            from the Philippines. I've been working as a domestic helper for 2
            years in Saudi Arabia, with my current employer of 2 adults and 2
            children. My expertise is housekeeping, cooking, mar...
          </p>

          {/* improve no repeat under the code using store the value in array and using arram method print*/}
          <ul className="list-outside flex flex-wrap lg:mt-11 gap-x-3">
            <li className="text-style">
              <span className="text-green-400">
                <BiSolidBadge />
              </span>
              <p>4yr experienceFrom</p>
            </li>
            <li className="text-style">
              <span className="text-green-400">
                <FaCalendarDays />
              </span>
              <p> 05 Jan 2024 | Full Time</p>
            </li>
            <li className="text-style">
              <span className="text-green-400 bg">
                <BiSolidCircle />
              </span>
              <p>Very Active</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CandidateCart;
