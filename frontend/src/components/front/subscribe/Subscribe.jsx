import { useState, useEffect } from 'react';

const Subscribe = () => {
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const handleSubscribe = () => {
    setShowConfirmMessage(true);
  };

  const ConfirmMessage = () => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setShowConfirmMessage(false);
      }, 4000);

      return () => clearTimeout(timeoutId); // Clear the timeout on unmount
    }, []);

    return <p className="mt-4">Thanks for subscribing to our newsletter, you should start recieving updates from us shortly</p>;
  };

  return (
    <div style={{background: "#9e9e9e"}} className="relative">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="mx-auto lg:mx-0 items-center lg:flex lg:max-w-none">
          <div className="lg:mt-0 text-white lg:pr-8 lg:w-full lg:max-w-xs lg:flex-shrink-0">
            <h2 className="text-3xl font-bold tracking-tight">Vensle</h2>
          </div>
          <div className="w-full text-white">
            <h1 className="tracking-tight text-sm">NEW TO VENSLE?</h1>
            <p className="text-sm py-2">Sign up for our newsletter</p>

            {showConfirmMessage
		    ?
		    <ConfirmMessage />
		    :
		    <form onSubmit={handleSubscribe} className="mt-2 relative">
		      <input
			id="email"
			name="email"
			type="email"
			autoComplete="email"
			required
		        placeholder="Email Address"
			//value={resetFormData.email}
			//onChange={handleResetInputChange}
		        style={{background: "#9e9e9e", background: "transparent"}}
			className="block w-full rounded-md border-2 py-3.5 text-white placeholder:text-white sm:text-sm sm:leading-5"
		      />
		      <button
		        style={{right: "0", top: "0", background: "#ff5959", bottom: "0", margin: "2px", zIndex: "1", borderTopRightRadius: "0.275rem", borderBottomRightRadius: "0.275rem"}}
		        className="absolute px-8"
		        type="submit"
		      >
			SUBSCRIBE
		      </button>
		    </form>
	    }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
