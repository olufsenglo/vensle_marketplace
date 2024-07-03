import { Link } from "react-router-dom";

import {
	UserIcon,
} from '@heroicons/react/24/outline'

import CartLink from "./CartLink";
import AuthUserDropDownMenu from "./AuthUserDropDownMenu";
import person from "assets/img/front/person.PNG";

const SignInRegisterLink = ({
    user,
    handleTopNavClick,
    isAuthenticated,
    handleSignInClick,
    handleRegisterClick,
    visible="always"
}) => {
    return(
      <div className={`absolute right-0 top-[10px] lg:top-0 mr-auto ml-auto max-w-2xl text-[0.9rem] items-center justify-end px-6 md:px-0 lg:relative lg:max-w-none lg:justify-start ${
	visible === "onScroll" ? "hidden lg:flex" : "inline-flex lg:flex"
      }`}>
	  <div className="flex items-center">	    
	      {isAuthenticated && (
		    <AuthUserDropDownMenu user={user} handleTopNavClick={handleTopNavClick} />
	      )}
	      {!isAuthenticated && (
		  <UserIcon
		      onClick={handleSignInClick}
		      className="mr-4 w-[1.7rem] h-[1.7rem] block cursor-pointer lg:hidden"
		  />
	      )}
		  <UserIcon className="mr-[1px] hidden lg:block w-[28px] h-[28px]" />

	      <div className="justify-space-between flex hidden h-full flex-col lg:block">
		  {isAuthenticated && (
		    <p className="mt-0 text-[12px]">Hello {user.name}</p>
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
          <CartLink visible={visible} />
      </div>
    )
}

export default SignInRegisterLink;
