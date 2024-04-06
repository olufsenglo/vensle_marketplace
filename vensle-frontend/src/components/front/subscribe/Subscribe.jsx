import { useState, useEffect } from "react";

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

    return (
      <p className="mt-4">
        Thanks for subscribing to our newsletter, you should start recieving
        updates from us shortly
      </p>
    );
  };

  return (
    <div style={{ background: "#9e9e9e" }} className="relative">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="mx-auto items-center lg:mx-0 lg:flex lg:max-w-none">
          <div className="text-white lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0 lg:pr-8">
            <h2 className="text-3xl font-bold tracking-tight">Vensle</h2>
          </div>
          <div className="w-full text-white">
            <h1 className="text-sm tracking-tight">NEW TO VENSLE?</h1>
            <p className="py-2 text-sm">Sign up for our newsletter</p>

            {showConfirmMessage ? (
              <ConfirmMessage />
            ) : (
              <form onSubmit={handleSubscribe} className="relative mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email Address"
                  //value={resetFormData.email}
                  //onChange={handleResetInputChange}
                  style={{ background: "#9e9e9e", background: "transparent" }}
                  className="block w-full rounded-md border-2 px-4 py-3.5 text-white placeholder:text-white sm:text-sm sm:leading-5"
                />
                <button
                  style={{
                    right: "0",
                    top: "0",
                    background: "#ff5959",
                    bottom: "0",
                    margin: "2px",
                    zIndex: "1",
                    borderTopRightRadius: "0.275rem",
                    borderBottomRightRadius: "0.275rem",
                  }}
                  className="absolute px-8"
                  type="submit"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
