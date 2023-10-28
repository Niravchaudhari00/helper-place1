import { NavLinks } from "../constant/NavLinks";

const Navbar = () => {
  return (
    <div className="w-11/12 h-14 p-1 flex items-center justify-between mx-auto ">
      {/* logo */}
      <h1>Logo</h1>
      {/* menu */}
      <div className="flex w-10/12  justify-between items-center">
        <ul className="flex gap-x-10 text-lg font-semibold ">
          {NavLinks.map((link) => (
            <li className="uppercase cursor-pointer" key={link.id}>
              {link.title}
            </li>
          ))}
        </ul>

        {/* Login & Singup */}
        <div className="flex gap-x-5s">
          <button>Login</button>
          <button>Singup</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
