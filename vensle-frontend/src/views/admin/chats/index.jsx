import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { StarIcon } from '@heroicons/react/20/solid'
import axios from "axios";
import moment from "moment";

import Table from './Table'

const columnsData = [
         {
           Header: "img",
           accessor: "last_message.content",
           Cell: ( props ) => {
 	    	return <ImageRow props={props} / >
  	   }
         },
         {
           Header: "",
           accessor: "last_message.receiver.name",
           Cell: ( props ) => {
 	    	return <NameRow props={props} / >
  	   }
         },
]

    const NameRow = ({props}) => {
	return (
  	<span className="flex items-center absolute">

      	</span>
	)
    }

    const ImageRow = ({props}) => {
	const message = props.row.original.last_message
	const msg_count = props.row.original.unread_count
	const userId = useSelector((state) => state?.auth?.user.user.id);
	const recipient = userId == props.row.original.last_message.sender_id ?
		    "receiver"
	    	    : "sender"

	//console.log('orig', props.row.original)
	//console.log('uza', recipient)
	return (
	    <span className="flex items-center">
		<img
		  src={getImagePath(message[recipient]?.profile_picture)}
		  alt="Profile"
		  className="ml-2 w-8 h-8 mr-3 object-cover rounded-full"
		/>
		<div className="flex-1">
		   <h4 className="font-bold">{message[recipient].name}</h4>
		   <p
		      className={`${!msg_count && 'text-gray-900/70'}`}
		   >
			{message.content}
		   </p>
		</div>
		<div className="mx-2 text-right">
		   <p>{moment(message.created_at).fromNow()}</p>
		   {msg_count ? <span
		     className="flex justify-center items-center ml-auto w-4 h-4 text-[10px] bg-green-600 rounded-full text-white"
		   >
			{msg_count}
		   </span>
		   : 
		   <span className="block w-4 h-4">
			   {" "}
		   </span>}
		</div>
	    </span>
	)
    }

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };

const baseURL = "http://localhost:8000";
//const baseURL = "https://nominet.vensle.com/backend";

const Chats = () => {
  const columns = useMemo(() => columnsData, []);
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
  const accessToken = useSelector((state) => state?.auth?.user?.token);
  const user = useSelector((state) => state?.auth?.user.user);

  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUserMessages, setLoadingUserMessages] = useState(false);
  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState([]);
  const [selectedMsgId, setSelectedMsgId] = useState([]);
  const [msgRecipient, setMsgRecipient] = useState('');
  const handleSubmitMessage = async (e) => {
      e.preventDefault();
      setLoading(true)
      const postData = {
	receiver_id: 1,
	content: message
      }
      try {
        const response = await axios.post(
          `${baseURL}/api/v1/messages`,
          postData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setUserMessages([...userMessages, response.data]);
	setMessage('')
      } catch (error) {
        console.error("Error fetching message:", error);
      } finally {
        setLoading(false);
      }
  }

  const handleGetUserMessage = async (userId, recipient) => {
      setLoadingUserMessages(true)
      try {
        const response = await axios.get(`${baseURL}/api/v1/user/chats/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserMessages(response.data.chats);
	setMsgRecipient(recipient);
      } catch (error) {
        console.error("Error fetching user messages:", error);
      } finally {
        setLoadingUserMessages(false);
      }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/last-chat`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data.chats);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userMessages]);

  return (
    <div>
      <div className="mt-5 min-h-[25rem] grid h-full grid-cols-1">
	  {console.log('recipe',msgRecipient)}
	  <div className="flex relative h-[82vh]">
		<Table
	  	   columns={columns}
	  	   data={data}
	   	   user={user}
	  	   setSelectedMsgId={setSelectedMsgId}
	  	   handleGetUserMessage={handleGetUserMessage}
	  	/>
	  	<div className="absolute flex flex-col w-full bg-white top-0 h-full md:relative md:w-2/3">
	  	  {userMessages.length > 0 && (
		    <div style={{borderBottom: "1px solid #eee"}} className="flex p-2 h-[3.7rem] items-center">
		      {loadingUserMessages ? <p>Loading...</p> : <>
	  		<div>
	  		   <img
			     src={getImagePath(userMessages[0][msgRecipient]?.profile_picture)}
			     className="w-8 h-8 rounded-full object-cover"
			     alt="profile"
			   />
	  		</div>
	  		<div className="ml-2">
	  		    <h4>
			        {userMessages[0][msgRecipient]?.name}
	  		    </h4>
	  		    <p className="text-sm mt-[-3px] text-green-500">
	  		        Online
	  		    </p>
	  		</div>
		      </>}
	  	    </div>)}
		    <div className="p-3 flex-1 overflow-auto">
			    {loadingUserMessages ? (
				<p>Loading</p>
			    ) : (
				userMessages.length > 0 ? (
				    userMessages.map((message) => (
					<span
					    className={`flex ${message.sender_id == user.id && 'justify-end'}`}
					    key={message.id}>
					    <img
					      src={getImagePath(message?.receiver?.profile_picture)}
					      alt="profile"
					      className="w-5 h-5 mr-2 rounded-full object-cover"
					    />
					    <span className="py-2 px-3 mb-3 bg-gray-200 rounded-xl rounded-tl-none">
					    	<p>{message.content}</p>
					        <p className="text-gray-500 text-xs">
					    	    {message.created_at}
					    	</p>
					    </span>
					</span>
				    ))
				) : (
				    <p>No messages</p>
				)
			    )}
	  	    </div>
	  	    <form onSubmit={handleSubmitMessage} className="flex p-3 gap-3 bg-blue-300/50">
	     		<input
	  		   className="flex-1 rounded-md p-3"
	  		   type="text"
	  		   placeholder="Type your message here..."
	  		   value={message}
	  		   onChange={(e) => setMessage(e.target.value)}
	   		/>
	  		<input
	  		   className="py-3 px-5 rounded-md bg-blue-800/50 text-white cursor-pointer"
	  		   type="submit"
	  		   value={`${loading ? 'loading...' : 'Send'}`}
	  		/>
	  	    </form>
	  	</div>
	  </div>
      </div>
    </div>
  );
};

export default Chats;
