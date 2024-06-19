import { Link } from "react-router-dom";

import CartLink from "./CartLink";
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
      <div className="absolute right-0 left-0 mr-auto ml-auto flex max-w-2xl text-[0.9rem] items-center justify-end px-6 md:px-0 lg:relative lg:max-w-none lg:justify-start">
	  <div className="flex items-center">
	      {isAuthenticated && (
		    <AuthUserDropDownMenu user={user} handleTopNavClick={handleTopNavClick} />
	      )}
	      {!isAuthenticated && (
		  <img src={person} onClick={handleSignInClick} className="mr-[1px] block cursor-pointer lg:hidden" />
	      )}
	      <img src={person} className="mr-[1px] hidden lg:block" />

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
          <CartLink />
      </div>
    )
}

export default SignInRegisterLink;
