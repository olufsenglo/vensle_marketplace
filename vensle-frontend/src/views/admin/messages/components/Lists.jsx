import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { XMarkIcon } from "@heroicons/react/24/outline";

import Card from "components/card";
import Message from "components/front/message/Message";

const baseURL = "https://nominet.vensle.com/backend";

const Lists = ({
	messages,
	fetchSentMessages,
	direction,
}) => {
	const accessToken = useSelector((state) => state.auth?.user?.token);

	const [selectedMessageId, setSelectedMessageId] = useState(null);
	const [messageThread, setMessageThread] = useState(null);
	const [messageOpen, setMessageOpen] = useState(false);
	const [viewMessage, setViewMessage] = useState(false);
	const [expandThread, setExpandThread] = useState(false);
	const [loadingThread, setLoadingThread] = useState(true);

	const handleViewThread = async (messageId) => {
		setSelectedMessageId(messageId)
		setLoadingThread(true)
		setViewMessage(true)
		try {
			const response = await axios.get(`${baseURL}/api/v1/messages/${messageId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			setMessageThread(response.data);
			setLoadingThread(false)
		} catch (error) {
			setLoadingThread(false)
			console.error("Error fetching message thread:", error);
		}
	}

	const handleShowMessage = () => {
		setMessageOpen(true);
	};

	const handleCloseMessageThread = () => {
		setSelectedMessageId(null);
		setViewMessage(false);
	};

	const threadRepliesStyle = {
		position: "absolute",
		top: "2rem",
		bottom: "0",
		background:
			"linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(255, 255, 255, 0))",
		borderRadius: "0.4rem",
		inset: "0",
	};

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };
	//if (!messages) return <p>Loading</p>

	return (
		<>
			<div className={`shrink-0 w-full transform transition-transform duration-300 ${viewMessage && "md:w-[35%]"}`}>
	                   <Card extra={"w-full p-4 h-full"}>
				{messages?.length === 0 ? (
					<p className="text-center mt-4">No messages found.</p>
				)
				:
				messages?.length > 0 && messages.map(message => (
						<div key={message.id} onClick={() => handleViewThread(message.id)} className={`cursor-pointer hover:bg-gray-200 rounded-md ease-in-out transition-all duration-300 ${
			message.id === selectedMessageId && "bg-gray-200"
						}`}>
							<div className="text-sm p-4 flex">
						{message.product?.display_image && 
						(<div className="w-5 h-full mr-2 w-12 h-12 rounded-full border border-4">
						    <img
						      src={getImagePath(message.product.display_image.name)}
						      alt={message.product.display_image.name}
							className="rounded-full"
						     />
						</div>)}
								<div className="flex-1">
								{message?.latest_reply && (
									<div className="w-full">
										<div className="flex items-center justify-between">
											<p>{message.sender.name}</p>
											<p style={{ fontSize: "12px" }}>{moment(message.created_at).fromNow()}</p>
										</div>
										<div>
											<p className="font-semibold">{message.latest_reply.content}</p>
										</div>
									</div>
								)}
								{message?.latest_reply ? (
									<p className="border border-gray-400 inline-block mt-1 rounded-full py-1 px-4"> <span style={{ fontSize: "11px", fontStyle: "italic" }}>Reply to:</span> {message.content}</p>

								) : (
									<div>
										<div className="flex justify-between">
									             	<p>
										             {direction === 'to' ? message.receiver.name : message.sender.name}	
											</p>
											<p style={{ fontSize: "12px" }}>{moment(message.created_at).fromNow()}</p>
										</div>
										<div>
											<p>{message.content}</p>
										</div>
									</div>
								)}
								</div>
							</div>
						</div>
					)
				)}
			     </Card>
			</div>
			<div className={`md:w-[65%] w-full relative min-h-[75vh] shrink-0 transform transition-transform duration-300 ${
					viewMessage ? "translate-x-0" : "translate-x-full"
				}`}>
	                   <Card extra={"w-full p-4 h-full"}>

				{loadingThread ? (<p className="absolute inset-0 flex justify-center items-center">Loading...</p>)
					:
					<div style={{ flexDirection: "column" }} className="flex flex-column h-full overflow-hidden">
					{console.log('mesthreee', messageThread)}
						<Message
							open={messageOpen}
							setOpen={setMessageOpen}
							type="reply"
							title={messageThread?.replies?.length > 0 ? messageThread.replies[0].content : messageThread?.content}
							redirect="/admin/messages/sent"
							messageToReply={messageThread}
							receiverId={messageThread.sender_id}
							fetchSentMessages={fetchSentMessages}
							setViewMessage={setViewMessage}
						/>


						<div className="relative border-b flex justify-between items-center p-4">
							<span
								className="font-sm cursor-pointer absolute top-[2px] right-[0.5rem]"
								onClick={handleCloseMessageThread}
							>
								<XMarkIcon className="h-5 w-5 hover:bg-gray-200 ease-in-out transition-all duration-300 rounded-full" aria-hidden="true" />
							</span>
							<div className="flex">

						{messageThread.product?.display_image && 
						(<div className="w-5 h-full mr-2 w-12 h-12 rounded-full border border-4">
						    <img
						      src={getImagePath(messageThread.product.display_image.name)}
						      alt={messageThread.product.display_image.name}
						      className="rounded-full"
						     />
						</div>)}


					 		    <div>
								<p className="font-semibold">
									{/*messageThread.content*/}
									Product
									<span className="text-gray-600 ml-2" style={{ fontSize: "11px" }}>
										{moment(messageThread.created_at).fromNow()}
									</span>
								</p>
								<p className="text-sm text-gray-800">
									<span className="text-sm">{direction}: </span> 
									{direction === 'to' ? messageThread.receiver.name : messageThread.sender.name }
								</p>
							     </div>
							</div>
							<div>
					{/*<span className="text-red-400 text-sm cursor-pointer rounded-full py-1 px-4 hover:bg-gray-200 ease-in-out transition-all duration-300">Delete</span>*/}
								<span
									onClick={() => handleShowMessage()}
									className="ml-2 cursor-pointer rounded-full py-1 px-4 hover:bg-gray-200 dark:text-white ease-in-out transition-all duration-300"
								>
									Reply
								</span>
							</div>
						</div>
						<div style={{ flexDirection: "column" }} className="flex-1 flex">
							<div className="flex-1 p-4 m-4 bg-gray-100 rounded-md">
								{messageThread.replies?.length > 0 ? (
									<p>{messageThread.replies[0].content}</p>
								) : (
									<p>{messageThread.content}</p>
								)}
							</div>
							{messageThread?.replies.length > 0 &&
								<ul
									onClick={() => setExpandThread(!expandThread)}
									className={`relative mt-2 cursor-pointer ease-in-out transition-all duration-300 ${expandThread ? "h-auto max-h-[60%]" : "h-[110px]"
										}`}
								>
									<p className="mx-4" style={{ fontSize: "11px", letterSpacing: "1px" }}>REPLIES</p>
									{messageThread.replies.map(reply => (
										<li
											className="flex border-b text-sm justify-between py-2 px-4 mb-4"
											key={reply.id}
										>
											{reply.content}
											<p style={{ fontSize: "12px", fontStyle: "italic" }} className="text-gray-600">{moment(reply.created_at).fromNow()}</p>
										</li>
									))}
									<div style={expandThread ? { "display": "none" } : threadRepliesStyle}></div>
								</ul>}
						</div>
					</div>}
				</Card>
			</div>
		</>
	)
};

export default Lists;
