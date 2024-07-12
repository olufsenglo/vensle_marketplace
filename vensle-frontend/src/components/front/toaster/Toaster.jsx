import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CLEAR_MESSAGE } from "actions/types";

const Toaster = () => {
  const [msgHolder, setMsgHolder] = useState("");
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);

  const handleClearMessageClick = () => {
    dispatch({
      type: CLEAR_MESSAGE,
    });
  };

  useEffect(() => {
    let timer;
    if (message && (message?.message?.type === "success" || message?.message?.type === "error")) {
      timer = setTimeout(() => {
        dispatch({
          type: CLEAR_MESSAGE,
        });
      }, 13000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message, dispatch]);

  if (!message || typeof message?.message?.message !== 'string') {
    return null;
  }	


  return (
    <>
	  {console.log('mmeetypeiiiiooooo', typeof message?.message?.message)}
        <div
          onClick={() => handleClearMessageClick()}
          style={{ top: "5rem", zIndex: "99999", left: "0", right: "0" }}
          className="fixed cursor-pointer text-center"
        >
          <span
            className={`bg-white py-2 px-8 rounded-lg border ${
		message?.message?.type == "success" ? 
			    "border-green-600 text-green-500" : 
			    "border-red-600 text-red-500"
	    }`}
          >

	      {message.message.message}
          </span>
        </div>
    </>
  );
};

export default Toaster;
