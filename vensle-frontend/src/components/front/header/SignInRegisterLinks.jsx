import { Link } from "react-router-dom";

import AuthUserDropDownMenu from "./AuthUserDropDownMenu";
import person from "assets/img/front/person.PNG";

const SignInRegisterLink = ({
    user,
    handleTopNavClick,
    isAuthenticated,
    handleSignInClick,
    handleRegisterClick,
}) => {
    return(
      <div className="flex items-center">
	{isAuthenticated && (
	    <AuthUserDropDownMenu user={user} handleTopNavClick={handleTopNavClick} />
	)}
	{!isAuthenticated && (
	  <img src={person} onClick={handleSignInClick} className="mr-[4px] block cursor-pointer lg:hidden" />
	)}
	<img src={person} className="mr-[4px] hidden lg:block" />

	<div className="justify-space-between flex hidden h-full flex-col lg:block">
	  {isAuthenticated && (
	    <p className="mt-0 mb-[3px] text-[12px]">Hello {user.name}</p>
	  )}
	  <h2 className="cursor-pointer font-semibold mt-[-3px]">
	    {isAuthenticated ? (
	      <Link to="/admin/default">Dashboard</Link>
	    ) : (
	      <><span onClick={handleSignInClick} className="hover:underline">Sign In</span>/<span onClick={handleRegisterClick} className="hover:underline">Register</span></>
	    )}
	  </h2>
	</div>
      </div>
    )
}

export default SignInRegisterLink;
