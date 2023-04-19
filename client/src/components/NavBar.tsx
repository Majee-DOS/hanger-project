import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons"
import Logo from '../images/Hanger.png'

const NavBar: React.FC = () => {
  return (
    <span className="flex justify-between bg-slate-100">
      <img src={Logo} className="w-24 h-24 ml-8"/>
      {/* image here */}
      <form className="ml-14">
        <input
          type="text"
          className="px-96 py-4 m-2 mt-4 rounded-full form-input"
        />
        <button className="p-2">Search</button>
      </form>
      {/* searchBar here */}
      <span className="m-2 flex">
        <FontAwesomeIcon
          icon={faUserAstronaut}
          className="userIcon p-4 mt-2 mr-9 text-2xl"
        />
        {/* profile img here  */}
        <FontAwesomeIcon
          icon={faCommentDollar}
          className="notification p-4 mt-2 mr-9 text-2xl "
        />
        {/* notification icon here
      (with state if new message)  */}
        <button className="p-4 m-2 rounded-full ">Sell Now</button>
        {/*  sell button here */}
      </span>
    </span>
  );
};

export default NavBar;
