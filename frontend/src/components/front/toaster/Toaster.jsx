import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    CLEAR_MESSAGE,
  } from "actions/types";


const Toaster = () => {
    const [ msgHolder, setMsgHolder ] = useState('');
    const dispatch = useDispatch();
    const message = useSelector(state => state.message);

/*	
	setTimeout(() => (
		dispatch({
			type: CLEAR_MESSAGE,
		})
	), 20000)

        dispatch({
		type: CLEAR_MESSAGE,
        });
*/

    return (
	<>
{message && message?.message?.type == "success" &&
	    <div style={{top:"5rem", zIndex: "99999", left: "0", right: "0"}} className="text-center fixed">
		<span style={{border:"1px solid green", padding: "5px 18px", borderRadius: "5px"}} className="text-green-500 bg-white">
	    		{message.message.message}
	    	</span>
	    </div>
}
	</>
    )
}

export default Toaster;
