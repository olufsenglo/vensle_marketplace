import { Fragment, useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const baseURL = 'https://nominet.vensle.com/backend';
export default function Feedback({ open, setOpen, productId }) {
  const accessToken = useSelector((state) => state?.auth?.user?.token);
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);

  const [content, setContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [rating, setRating] = useState(1);
  const [feedbackList, setFeedbackList] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [feedbackParentId, setFeedbackParentId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);

  const [feedbacks, setFeedbacks] = useState([]);
  const [replies, setReplies] = useState([]);
	
    const getImagePath = (name) => {
      return `${baseURL}/uploads/${name}`;
    };

  const handleShowReplyForm = (parentId) => {
	  setFeedbackParentId(parentId);
	  setReplyContent('');
	  setShowReplyForm(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true);
    try {
      const headers = {
         Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post(`${baseURL}/api/v1/feedback`, {
        content,
        rating,
        product_id: productId,
      }, { headers });


      setContent('');
      setRating(1);
      setShowFeedbackForm(false);
      fetchFeedback();
setLoading(false);
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
setLoading(false);
    }
  };

  const handleSubmitReply = async (e, parentFeedbackId) => {
    e.preventDefault();
setReplyLoading(true);
    try {
const headers = {
  Authorization: `Bearer ${accessToken}`,
};	    
      const response = await axios.post(`${baseURL}/api/v1/feedback`, {
	content: replyContent,
        rating,
        product_id: productId,
        parent_id: parentFeedbackId,
      }, { headers });

      console.log('Feedback submitted:', response.data);

      setReplyContent('');
      setRating(1);
      setShowReplyForm(false);	
      fetchFeedback();
      setReplyLoading(false);
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      setReplyLoading(false);
    }
  };


  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/v1/feedback/${productId}`);

      // Separate feedbacks and replies
      const feedbackArray = response.data.filter((feedback) => !feedback.parent);
      const replyArray = response.data.filter((feedback) => feedback.parent);

      setFeedbacks(feedbackArray);
      setReplies(replyArray);
    } catch (error) {
      console.error('Error fetching feedback:', error.message);
    }
  };


  useEffect(() => {
    fetchFeedback();
  }, [productId]);	
	
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full">
                        <p className="text-2xl text-gray-900">Feedbacks</p>
	  		
                        {isAuthenticated && !showFeedbackForm && <p onClick={() =>setShowFeedbackForm(true)} className="cursor-pointer mt-2 text-center mt-2 mb-3 cursor-pointer rounded-full px-3 py-1 hover:bg-gray-200">New Feedback</p>}

	  		{showFeedbackForm && <form className="mb-8" onSubmit={handleSubmit}>

			  <div className="mt-2">
			    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
			      Message
			    </label>
			    <div className="mt-2.5">
			      <textarea
				name="message"
				id="message"
				rows={2}
				value={content}
			        onChange={(e) => setContent(e.target.value)}
			        required
				className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			      />
			    </div>
			  </div>

		      <div className="mt-2 flex items-center">
			{[1, 2, 3, 4, 5].map((eachRating) => (
			  <StarIcon
			    onClick={() => setRating(eachRating)}
			    key={eachRating}
			    className={classNames(
			      rating > eachRating - 1 ? 'text-orange-900' : 'text-orange-200',
			      'h-5 w-5 cursor-pointer flex-shrink-0'
			    )}
			    aria-hidden="true"
			  />
			))}
		      </div>


			<div className="mt-2">
			  <button
			    type="submit"
			    disabled={loading}
			    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			  >
			    {loading ? "Loading..." : "Submit"}
			  </button>
			</div>

                     </form>
			}

<div>


      <div>
        {/* Display Feedbacks */}
	{loading && <p>Loading...</p>}

        {!loading && feedbacks.length > 0 ? feedbacks.map((feedback) => (
          <div className="mb-4" key={feedback.id}>
	    <div className="flex">
		<div className="w-10 h-10 mr-4">
			<img
			  className="rounded-full"
			  src={getImagePath(feedback.user.profile_picture)}
			  alt={feedback.user.name}
			/>
		</div>
		<div className="">
			<div className="flex text-xs mb-1">
				<p className="mr-2 text-gray-800">{feedback.user.name}</p>
				<p>{feedback.created_at}</p>
			</div>
		        <p className="">{feedback.content}</p>
			<div className="display flex items-center">
				<div className="flex items-center">
					{[0, 1, 2, 3, 4].map((rating) => (
					  <StarIcon
					    key={rating}
					    className={classNames(
					      feedback.rating > rating ? 'text-orange-900' : 'text-orange-200',
					      'h-3 w-3 flex-shrink-0'
					    )}
					    aria-hidden="true"
					  />
					))}
				</div>
				<div className="ml-3">
					{(isAuthenticated && (!showReplyForm || feedbackParentId !== feedback.id)) && 
						<p onClick={() => handleShowReplyForm(feedback.id)} className="cursor-pointer text-right text-sm rounded-full px-3 py-1 hover:bg-gray-200">
						   Reply
						</p>
					}
				</div>
			</div>

		          {showReplyForm && feedbackParentId === feedback.id && <form >

				  <div className="mt-2">
				    <div className="mt-2.5">
				      <textarea
					name="message"
					id="message"
					rows={2}
					value={replyContent}
					onChange={(e) => setReplyContent(e.target.value)}
					required
					className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				      />
				    </div>
				  </div>



				<div className="mt-2">
				  <button
				    onClick={(e) => handleSubmitReply(e, feedback.id)}
				    type="submit"
			    	    disabled={replyLoading}
				    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				  >
			    	    {replyLoading ? "Loading..." : "Submit"}
				  </button>
				</div>

			     </form>}


		</div>
	    </div>

            {/* Display Replies for the current Feedback */}
            {replies
              .filter((reply) => reply.parent_id === feedback.id)
              .map((reply) => (
		    <div key={reply.id} className="flex items-center ml-12 mt-1">
			<div className="w-6 h-6 mr-2">
				<img
				  className="rounded-full"
				  src={getImagePath(reply.user.profile_picture)}
				  alt={reply.user.name}
				/>
			</div>
			<div className="">
				<div className="flex text-xs">
					<p className="mr-2 text-gray-800">{reply.user.name}</p>
					<p>{reply.created_at}</p>
				</div>
				<p className="mt-1">{reply.content}</p>
			</div>
		    </div>
              ))}
          </div>
        ))
	:
	<p className="text-center mt-4">There are currently no feedbacks</p>
	}
      </div>

	  {/*
      <ul>
        {feedbackList.length > 0 ? feedbackList.map((feedback) => (
          <li className="mt-6" key={feedback.id}>
            <strong>User:</strong> {feedback.user.name} <br />
            <strong>Rating:</strong> {feedback.rating} <br />
            <strong>Content:</strong> {feedback.content} <br />

	                {(!showReplyForm || feedbackParentId !== feedback.id) && <p onClick={() => handleShowReplyForm(feedback.id)} style={{marginTop: "-2rem"}} className="cursor-pointer text-right">Reply</p>}

	  		{showReplyForm && feedbackParentId === feedback.id && <form >

			  <div className="mt-2">
			    <div className="mt-2.5">
			      <textarea
				name="message"
				id="message"
				rows={2}
				value={replyContent}
			        onChange={(e) => setReplyContent(e.target.value)}
			        required
				className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			      />
			    </div>
			  </div>



			<div className="mt-2">
			  <button
			    onClick={(e) => handleSubmitReply(e, feedback.id)}
			    type="submit"
			    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			  >
			    Submit
			  </button>
			</div>

                     </form>
		}




          </li>
        )) : <p className="text-center mt-4">There are currently no feedbacks</p>}
      </ul>
      */}
    </div>

                 
                  </div>


                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
