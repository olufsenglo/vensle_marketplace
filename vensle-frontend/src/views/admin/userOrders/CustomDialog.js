import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function CustomDialog({ deleteTransaction, open, setOpen, deleteLoading}) {

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-blue-400 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base text-white text-center font-semibold leading-6">
                        Reason for Unblocking
                      </Dialog.Title>
                      <div className="mt-2 bg-white/30 rounded-lg p-3">
                        <p className="text-sm text-white">
                          Are you sure you want to deactivate your account? All of your data will be permanently
                          removed. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
	        <div className="mt-8">
	  		<div className="text-center mb-2">
	  		   <h2>This user will be Unblocked?</h2>
	  		   <p>Do you still want to continue with this action</p>
	  	   	</div>
			<div className="flex gap-4 px-4 py-3 sm:px-6">
			  <button
			    type="button"
			    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
			    onClick={() => setOpen(false)}
			    data-autofocus
			  >
			    Cancel
			  </button>
			  <button
			    type="button"
			    className="inline-flex w-full justify-center rounded-md bg-blue-600/50 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500/50"
			    onClick={() => deleteTransaction()}
			  >
			      {deleteLoading ? 'Loading...': 'Unblock'}
			  </button>
			</div>
	  	</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
