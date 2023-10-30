import { NavLinks } from "../constant/NavLinks";
import helperPlace from "../assets/helperplace.svg";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCaretDown } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="relative">
      <div className="w-11/12 mx-auto px-2 my-2 h-14 flex items-center md:justify-center lg:justify-between  gap-x-5 lg:gap-x-0">
        {/* logo */}
        <div className="lg:hidden md:absolute text-[30px] left-5">
          <GiHamburgerMenu />
        </div>
        <div className="">
          <Link to={"/"}>
            <img
              src={helperPlace}
              // height={150}
              width={170}
              alt="helper-place-logo"
            />
          </Link>
        </div>
        {/* menu */}
        <nav className="hidden w-10/12 lg:flex justify-between items-center">
          <ul className="flex w-[550px] justify-between font-semibold lg:text-base lg:px-5  xl:px-0">
            {NavLinks.map((link) => {
              return (
                <li key={link.id} className="uppercase cursor-pointer">
                  {link.id === 4 ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-2`}
                    >
                      <span>{link.title}</span>
                      <span className="lg:text-base">
                        <AiOutlineCaretDown />
                      </span>
                      {/* <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                    </div> */}
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <span>{link.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Login & Singup */}
          <div className="flex gap-x-5">
            <button className={`btn-style bg-greenbtn uppercase`}>Login</button>
            <button className="btn-style bg-yellowbtn uppercase">
              register
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
