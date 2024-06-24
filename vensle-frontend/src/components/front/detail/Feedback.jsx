import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseURL = "https://nominet.vensle.com/backend";

export default function Feedback({ open, setOpen, product, setProduct }) {
  const accessToken = useSelector((state) => state.auth?.user?.token);
  const user = useSelector((state) => state.auth?.user?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);

  const [content, setContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [feedbackParentId, setFeedbackParentId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [contentError, setContentError] = useState('');
  const [replyContentError, setReplyContentError] = useState('');

  // TODO: default should be 0, handle when rating is 0 (nothing should happen on the server side)
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);
  const handleStarHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };



  const [feedbacks, setFeedbacks] = useState([]);
  const [replies, setReplies] = useState([]);

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };

  const handleShowReplyForm = (parentId) => {
    setFeedbackParentId(parentId);
    setReplyContent("");
    setShowReplyForm(true);
  };

  const handleCloseFeedbackForm = (e) => {
    e.preventDefault();
    setContent("");
    setContentError("");
    setLoading(false);
    setShowFeedbackForm(false);
  }

  const handleCloseReplyForm = (e) => {
    e.preventDefault();
    setReplyContent("");
    setReplyContentError("");
    setReplyLoading(false);
    setShowReplyForm(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    !content ? setContentError('Please enter feedback') : setContentError('');

    if (content) {
      setLoading(true);
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.post(
          `${baseURL}/api/v1/feedback`,
          {
            content,
            rating,
            product_id: product.id,
          },
          { headers }
        );


        setContent("");
        setRating(1);
        setShowFeedbackForm(false);
        setFeedbacks([response.data, ...feedbacks]);

        const tempProduct = product;
        tempProduct.total_feedback = product.total_feedback + 1;
        setProduct(tempProduct)
        setLoading(false);
      } catch (error) {
        console.error("Error submitting feedback:", error.message);
        setLoading(false);
      }
    }
  };

  const handleSubmitReply = async (e, parentFeedback) => {
    e.preventDefault();
    !replyContent ? setReplyContentError('Please enter reply') : setReplyContentError('');

    if (replyContent) {
      setReplyLoading(true);
      try {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const response = await axios.post(
          `${baseURL}/api/v1/feedback`,
          {
            content: replyContent,
            rating,
            product_id: product.id,
            parent_id: parentFeedback.id,
          },
          { headers }
        );

        setReplyContent("");
        setRating(1);
        setShowReplyForm(false);

        setReplies([response.data, ...replies]);

        setReplyLoading(false);
      } catch (error) {
        console.error("Error submitting feedback:", error.message);
        setReplyLoading(false);
      }
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/feedback/${product.id}`
      );

      // Separate feedbacks and replies
      const feedbackArray = response.data.filter(
        (feedback) => !feedback.parent
      );
      const replyArray = response.data.filter((feedback) => feedback.parent);

      setFeedbacks(feedbackArray);
      setReplies(replyArray);
    } catch (error) {
      console.error("Error fetching feedback:", error.message);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [product.id]);

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

                    {!isAuthenticated && (
                      <p className="text-center py-4">Got feedback? Login to create one.</p>
                    )}
                    {isAuthenticated && !showFeedbackForm && (
                      <p
                        onClick={() => setShowFeedbackForm(true)}
                        className="mt-2 mb-3 cursor-pointer cursor-pointer rounded-full px-3 py-2 text-center hover:bg-gray-200"
                      >
                        Add Feedback
                      </p>
                    )}

                    {isAuthenticated && showFeedbackForm && (
                      <form className="mb-8" onSubmit={handleSubmit}>
                        <div className="mt-2">
                          <div className="mt-2.5">
                            <textarea
                              name="message"
                              id="message"
                              rows={2}
                              placeholder="Add a feedback..."
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <p className="text-red-500 text-sm pt-1">{contentError}</p>


                        <div className="mt-1 flex justify-between items-center">

                          {/*

                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((eachRating) => (
                              <StarIcon
                                onClick={() => setRating(eachRating)}
                                key={eachRating}
                                className={classNames(
                                  rating > eachRating - 1
                                    ? "text-orange-900"
                                    : "text-orange-200",
                                  "h-4 w-4 flex-shrink-0 cursor-pointer"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
*/}
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((eachRating) => (
                              <StarIcon
                                key={eachRating}
                                className={classNames(
                                  rating >= eachRating || hoverRating >= eachRating
                                    ? 'text-yellow-500'
                                    : 'text-gray-300',
                                  'h-4 w-4 cursor-pointer transition-colors duration-200'
                                )}
                                onMouseEnter={() => handleStarHover(eachRating)}
                                onMouseLeave={() => handleStarHover(0)}
                                onClick={() => handleStarClick(eachRating)}
                                aria-hidden="true"
                              />
                            ))}
                          </div>



                          <div className="flex">
                            <button
                              onClick={handleCloseFeedbackForm}
                              className="rounded-md mr-2 px-3 py-2.5 text-center text-sm text-red-600 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={loading}
                              className="flex relative items-center justify-center w-[7rem] rounded-md bg-red-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                              {loading && <svg
                                class="animate-spin absolute left-[0.5rem] h-4 w-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  class="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  stroke-width="4"
                                ></circle>
                                <path
                                  class="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>}
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    <div>
                      <div>
                        {/* Display Feedbacks */}

                        {feedbacks.length > 0 ? (
                          feedbacks.map((feedback) => (
                            <div className="mb-4" key={feedback.id}>
                              <div className="flex w-full">
                                <div className="mr-4 h-10 w-10">
                                  <img
                                    className="rounded-full object-cover h-full w-full"
                                    src={getImagePath(
                                      feedback.user?.profile_picture
                                    )}
                                    alt={feedback.user?.name}
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="mb-1 flex items-center">
                                    <p className="mr-2 text-sm font-medium">
                                      {feedback.user?.name}
                                    </p>
                                    <p className="text-xs text-gray-900">{moment(feedback.created_at).format("Do MMM YYYY")}</p>
                                  </div>
                                  <p className="">{feedback.content}</p>
                                  <div className="display flex items-center">
                                    <div className="flex items-center">
                                      {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                          key={rating}
                                          className={classNames(
                                            feedback.rating > rating
                                              ? "text-orange-900"
                                              : "text-orange-200",
                                            "h-3 w-3 flex-shrink-0"
                                          )}
                                          aria-hidden="true"
                                        />
                                      ))}
                                    </div>
                                    <div className="ml-3">
                                      {isAuthenticated && !feedback?.new &&
                                        (!showReplyForm ||
                                          feedbackParentId !== feedback.id) && (
                                          <p
                                            onClick={() =>
                                              handleShowReplyForm(feedback.id)
                                            }
                                            className="cursor-pointer font-medium rounded-full px-3 py-1 text-right text-sm hover:bg-gray-200"
                                          >
                                            Reply
                                          </p>
                                        )}
                                    </div>
                                  </div>

                                  {showReplyForm &&
                                    feedbackParentId === feedback.id && (
                                      <form>
                                        <div className="mt-2">
                                          <div className="mt-2.5">
                                            <textarea
                                              name="message"
                                              id="message"
                                              rows={2}
                                              value={replyContent}
                                              placeholder="Add a reply..."
                                              onChange={(e) =>
                                                setReplyContent(e.target.value)
                                              }
                                              required
                                              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                            />
                                          </div>
                                        </div>
                                        <p className="text-red-500 text-sm mt-1">{replyContentError}</p>

                                        <div className="mt-2 flex justify-end">
                                          <button
                                            onClick={handleCloseReplyForm}
                                            className="rounded-md mr-2 px-3 py-2.5 text-center text-sm text-red-600 shadow-sm hover:bg-red-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            onClick={(e) =>
                                              handleSubmitReply(e, feedback)
                                            }
                                            type="submit"
                                            disabled={replyLoading}
                                            className="block rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                          >
                                            {replyLoading
                                              ? "Loading..."
                                              : "Submit"}
                                          </button>
                                        </div>
                                      </form>
                                    )}
                                </div>
                              </div>

                              {/* Display Replies for the current Feedback */}
                              {replies
                                .filter(
                                  (reply) => reply.parent_id === feedback.id
                                )
                                .map((reply) => (
                                  <div
                                    key={reply.id}
                                    className="ml-12 mt-1 flex items-center"
                                  >
                                    <div className="mr-2 h-7 w-7">
                                      <img
                                        className="rounded-full"
                                        src={getImagePath(
                                          reply.user?.profile_picture
                                        )}
                                        alt={reply.user?.name}
                                      />
                                    </div>
                                    <div className="">
                                      <div className="flex items-center">
                                        <p className="mr-2 text-sm font-medium">
                                          {reply.user?.name}
                                        </p>
                                        <p className="text-xs text-gray-900">{moment(reply.created_at).format("Do MMM YYYY")}</p>
                                      </div>
                                      <p className="mt-1">{reply.content}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ))
                        ) : (
                          <p className="mt-4 text-center">
                            There are currently no feedbacks
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
