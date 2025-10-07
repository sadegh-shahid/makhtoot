import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className=" ">
      <img src="/images/Logo.svg" alt="logo" className="w-11 h-11 mx-auto  " />
    </Link>
  );
}
