import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { StarIcon } from '@heroicons/react/20/solid'
import { MdDoneAll } from "react-icons/md";

import AttachImage from "components/front/detail/AttachImage"
import Table from './Table'

import noMsg from "assets/img/front/chat/no_msg.png";
import ButtonLoading from "components/Loading/ButtonLoading";

const columnsData = [
	{
		Header: "img",
		accessor: "last_message.content",
		Cell: (props) => {
			return <ImageRow props={props} />
		}
	},
	{
		Header: "",
		accessor: "last_message.receiver.name",
		Cell: (props) => {
			return <NameRow props={props} />
		}
	},
]

const NameRow = ({ props }) => {
	return (
		<span className="flex items-center absolute">

		</span>
	)
}

const ImageRow = ({ props }) => {
	const message = props.row.original.last_message
	const msg_count = props.row.original.unread_count
	const userId = useSelector((state) => state?.auth?.user.user.id);
	const recipient = userId == props.row.original.last_message.sender_id ?
		"receiver"
		: "sender"

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

const baseURL = "https://nominet.vensle.com/backend";

const Chats = () => {
	const chatContainerRef = useRef(null);
	const fileInputRef = useRef(null);
	const columns = useMemo(() => columnsData, []);
	const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);
	const accessToken = useSelector((state) => state?.auth?.user?.token);
	const user = useSelector((state) => state?.auth?.user.user);

	const [products, setProducts] = useState([]);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [lastChatLoading, setLastChatLoading] = useState(false);
	const [loadingUserMessages, setLoadingUserMessages] = useState(false);
	const [message, setMessage] = useState('');
	const [userMessages, setUserMessages] = useState([]);
	const [isUserMessagesRequest, setIsUserMessagesRequest] = useState(false);
	const [selectedMsgId, setSelectedMsgId] = useState('');
	const [msgRecipient, setMsgRecipient] = useState('');
	const [open, setOpen] = useState(false);


    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');

    const validateImage = (file) => {
        if (!file) {
            return 'Please select an image.';
        }

        if (file.size > 1024 * 1024) {
            return 'Image size should be less than 1MB.';
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            return 'Only JPG or PNG images are allowed.';
        }

        return '';
    };

const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validationResult = validateImage(selectedFile);
            if (validationResult) {
                setError(validationResult);
            } else {
		setOpen(true);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
                setImage(selectedFile);
                setError('');
		e.target.value = null;
            }
        }
    };

const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const validationResult = validateImage(image);
        if (validationResult) {
            setError(validationResult);
            setLoading(false);
        } else {
	    handleSubmitMessage(e);
        }
    };	



	const handleSubmitMessage = async (e) => {
		e.preventDefault();
		setLoading(true)
		const postData = {
			receiver_id: 1,
			content: message,
			image 
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
			setImage(null)
			setOpen(false)
	        	if (chatContainerRef.current) {
			    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
	      		}
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
			setIsUserMessagesRequest(true)

		} catch (error) {
			console.error("Error fetching user messages:", error);
			setIsUserMessagesRequest(false)
		} finally {
			setLoadingUserMessages(false);
		}
	}

	useEffect(() => {
		setLastChatLoading(true)
		const fetchUsers = async () => {
			try {
				const response = await axios.get(`${baseURL}/api/v1/user/chats/last-chat`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setData(response.data.chats);
				setLastChatLoading(false)
			} catch (error) {
				console.error("Error fetching users:", error);
				setLastChatLoading(false)
			}
		};

		fetchUsers();
	}, [userMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [message, userMessages]);	

  useEffect(() => {
	  setMessage("")
  }, [open]);	
	return (
		<div className="grid h-full absolute inset-0 grid-cols-1">

		{open && <AttachImage
		   open={open}
		   setOpen={setOpen}
		   handleSubmit={handleSubmit}
		   setMessage={setMessage}
		   handleImageChange={handleImageChange}
		   message={message}
		   imagePreview={imagePreview}
		   loading={loading}
		   error={error}
		   fileInputRef={fileInputRef}
		/>}


			<div className="flex">
				<div className="w-full pt-[103px] bg-[#fbf8ff] md:w-[40%]">
					<div className="pt-[9px] border-t border-t-4 border-[#eeeeee]">
						<Table
							columns={columns}
							data={data}
							user={user}
							loading={lastChatLoading}
							setSelectedMsgId={setSelectedMsgId}
							handleGetUserMessage={handleGetUserMessage}
						/>
					</div>
				</div>
				<div className="absolute pt-[103px] md:relative md:w-[60%] flex flex-col w-full h-[100vh] bg-white top-0 h-full">
					{userMessages.length > 0 && (
						<div className="flex p-2 h-[3.7rem] items-center border-t border-t-4 border-[#eee] border-b border-[#eee]">
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
					<div ref={chatContainerRef} className={`p-3 flex-1 overflow-auto ${
						!loadingUserMessages && userMessages.length === 0 && "flex justify-center items-center"
						} ${
						    userMessages.length === 0 && "border-t border-t-4 border-[#eeeeee]"
						}`}>
						{loadingUserMessages ? (
							<p>Loading</p>
						) : (
							userMessages.length > 0 ? (
								userMessages.map((message) => (
									<span
										className={`flex ${message.sender_id == user.id && 'justify-end'}`}
										key={message.id}
									>
										<img
											src={getImagePath(message?.receiver?.profile_picture)}
											alt="profile"
											className="w-5 h-5 mr-2 rounded-full object-cover"
										/>
										<span className="py-1 text-[15px] max-w-[50%] px-3 mb-3 bg-gray-200 rounded-xl rounded-tl-none">
				{message.image_path && <img className="mb-1" src={`${baseURL}/${message.image_path}`} alt="attachment" />}
											<p className="leading-5">{message.content}</p>
											<p className="flex justify-end items-center text-gray-500 text-xs">
				{moment(message.created_at).fromNow()}
				{message.sender_id == user.id && <MdDoneAll className={`ml-2 w-4 h-4 bottom-1 right-2 ${
				  message.is_read === "1" ? "text-blue-400" : "text-gray-600"
				}`} />}
											</p>
										</span>
									</span>
								))
							) : (
								<div className="flex flex-col justify-center items-center">
									<img src={noMsg} className="w-[15rem]" alt="No message" />
									<p className="text-gray-600 mt-6">Messages will appear here</p>
								</div>
							)
						)}
					</div>
		{userMessages.length > 0 && setIsUserMessagesRequest && <form onSubmit={handleSubmitMessage} className="flex p-2.5 gap-3 bg-[#dde1ff]">
					        <label htmlFor="file-upload" className="cursor-pointer py-2 px-3 bg-white rounded-md">
						    <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
						    <input
						        id="file-upload"
						        type="file"
						        accept="image/jpeg, image/png"
						        onChange={handleImageChange}
						        style={{ display: 'none' }}
					 	    />
					        </label>
						<input
							className={`flex-1 rounded-md px-3 py-2 ${
							     open && "text-white"
							}`}
							type="text"
							placeholder="Type your message here..."
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button
							className="py-2 px-5 rounded-md bg-[#4e5b92] hover:bg-ADashPrimary text-white cursor-pointer"
							type="submit"
							disabled={loading || message === ""}
						>
							{loading ? <ButtonLoading /> : "Send"}
						</button>
					</form>}

				</div>
			</div>
		</div>
	);
};

export default Chats;
