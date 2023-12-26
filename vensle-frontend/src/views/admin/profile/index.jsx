import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateUserProfile } from 'actions/auth';

import Card from "components/card";
import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";

const ProfileOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const accessToken = useSelector((state) => state.auth.user.token);
  const user = useSelector((state) => state.auth.user.user);


  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    profile_picture: null,
  });
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [businessError, setBusinessError] = useState('');
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);


  const [businessProfile, setBusinessProfile] = useState({
    user_id: user.id,
    business_email: '',
    business_name: '',
    business_address: '',
    business_number: '',
    bank_name: '',
    account_number: '',
    documentation: '',
    profile_picture: null,
  });


  const handleTabClick = (tabNumber) => {
	setActiveTab(tabNumber);
  };

  const userProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };	 

  const businessProfileChange = (e) => {
    const { name, value } = e.target;
    setBusinessProfile({
      ...businessProfile,
      [name]: value,
    });
  };	 

  const passwordDataChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };  
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setUserProfile({
      ...userProfile,
      profile_picture: selectedFile,
    });

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

/*  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
*/
  const handleBusinessDetailsSubmit = async (e) => {
	  const formData = null;
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/business-details', formData);

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setBusinessError(error.response.data.error || 'An error occurred.');
      } else {
        setBusinessError('An error occurred.');
      }
    }


  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/update-password', passwordData, {
              headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
              },
      });

	console.log(response.data.message);
      if (response.data.message) {
        setMessage('Password updated successfully!');
        setIsSuccess(true);

	setPasswordData({
	    old_password: '',
	    new_password: '',
	    new_password_confirmation: '',
	});
	      

      } else {
        setMessage('Failed to update password. Please check your credentials.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('An unexpected error occurred. Please try again later.');
      setIsSuccess(false);
    }
  };	


  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    try {
console.log("profile",userProfile)

      const formDataWithFile = new FormData();
      formDataWithFile.append('name', userProfile.name);
      formDataWithFile.append('email', userProfile.email);
      formDataWithFile.append('profile_picture', userProfile.profile_picture);

      const response = await axios.post('http://localhost:8000/api/v1/update-profile', formDataWithFile, {
              headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': `Bearer ${accessToken}`,
              },
      });

      if (response.data) {
        // Dispatch the action to update the user profile in Redux store
        dispatch(updateUserProfile(response.data));
        setProfileMessage('Details updated successfully!');

      //const updatedUser = { ...user, ...response.data };
      //localStorage.setItem('user', JSON.stringify(updatedUser));	      

        console.log(response.data);
        setProfileMessage('Profile updated successfully!');
      } else {
        // Handle errors appropriately
        alert('Failed to update profile. Please try again.');
      }
	    
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle errors appropriately
      setProfileError('The email has been taken');
    }	  
	  
  }

  useEffect(() => {
    setUserProfile({
	    name: user.name || '',
	    email: user.email || '',
	    number: user.number || '',
	    address: user.address || '',
    });
console.log(user);
    // Display the current profile picture
    if (user.profile_picture) {
      const path =  `http://127.0.0.1:8000/uploads/${user.profile_picture}`;
      setImgPath(path);
      setImagePreview(path);
    }
  }, [user]);

  return (
    <div className="flex w-full flex-col gap-5">


                        <div class="flex justify-center overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                            <button
	    			class={`inline-flex w-full justify-center items-center h-10 pr-4 -mb-px text-2xl text-left bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none transition duration-300 ${
					activeTab === 1 ? 'text-red-600 border-red-500 dark:border-red-400 dark:text-red-300' : 'text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400'
				}`}
		                onClick={() => handleTabClick(1)}
	    		     >
	  			Account
                            </button>


                            <button
	    			class={`inline-flex w-full justify-center items-center h-10 px-4 -mb-px text-2xl text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none ${
					activeTab === 2 ? 'text-red-600 border-red-500 dark:border-red-400 dark:text-red-300' : 'text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400'
				}`}
		                onClick={() => handleTabClick(2)}
	    		     >
                                Business
                            </button>


                        </div>
	  

{activeTab === 1 &&
<>	
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-6 lg:!mb-0">
          <Banner user={user} setImagePreview={setImagePreview} path={imgPath} imagePreview={imagePreview} handleFileChange={handleFileChange} />
        </div>
        <div className="col-span-6 lg:!mb-0">
          <Storage />
        </div>
        <form onSubmit={handleProfileSubmit} className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Card extra={"w-full p-4 h-full"}>
            <div className="mb-8 w-full">
	  {/*
      <label>
        Current Profile Picture:
        {imagePreview && (
          <img src={imagePreview} alt="Current Profile" style={{ maxWidth: '200px', maxHeight: '200px' }} />
        )}
      </label>
      <label>
        Profile Picture:
        <input
          type="file"
          accept="image/*"
          name="profile_picture"
          onChange={handleFileChange}
        />
      </label>	  
 /*/}
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                Update Details
              </h4>

{profileMessage && <p style={{"color":"green"}}>{profileMessage}</p>}
{profileError && <p style={{"color":"red"}}>{profileError}</p>}

              <div class="mt-11 flex flex-col space-y-4">
                <div>
                  <label for="name" class="text-xs font-semibold text-gray-501">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={userProfile.name}
                    onChange={userProfileChange}
                    name="name"
		    required
                    class="mt-2 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>                
                <div>
                  <label for="email" class="text-xs font-semibold text-gray-501">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userProfile.email}
                    onChange={userProfileChange}
		    required
                    class="mt-2 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div class="relative">
                  <label for="number" class="text-xs font-semibold text-gray-501">Phone number</label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    value={userProfile.number}
                    onChange={userProfileChange}
                    class="block w-full rounded border-gray-301 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div class="relative">
                  <label for="address" class="text-xs font-semibold text-gray-501">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={userProfile.address}
                    onChange={userProfileChange}
                    class="block w-full rounded border-gray-301 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div className="mt-5">
                  <button type="submit" className="linear mt-3 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Update details
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </form>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <Card extra={"w-full p-4 h-full"}>
            <div className="mb-8 w-full">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                Change password
              </h4>
              <div className="mt-2">
      {message && (
        <p style={{ color: isSuccess ? 'green' : 'red' }}>{message}</p>
      )}                
              <form onSubmit={handleSubmit} class="mt-10 flex flex-col space-y-4">
                <div>
                  <label for="old_password" class="text-xs font-semibold text-gray-500">Old Password</label>
                  <input
                    type="password"
                    id="old_password"
                    name="old_password"
                    value={passwordData.old_password}
                    onChange={passwordDataChange}
                    class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div class="relative">
                  <label for="new_password" class="text-xs font-semibold text-gray-500">New Password</label>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    value={passwordData.new_password}
                    onChange={passwordDataChange}
                    class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div class="relative">
                  <label for="new_password_confirmation" class="text-xs font-semibold text-gray-500">Confirm New Password</label>
                  <input
                    type="password"
                    id="new_password_confirmation"
                    name="new_password_confirmation"
                    value={passwordData.new_password_confirmation}
                    onChange={passwordDataChange}
                    class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div className="mt-4">
                  <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Update password
                  </button>
                </div>
              </form>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">

        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
      </div>

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>
      </div>
</>
}
{activeTab === 2 &&
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">


        <form onSubmit={handleBusinessDetailsSubmit} className="col-span-12 lg:col-span-12 lg:mb-0 3xl:col-span-4">

          <Card extra={"w-full p-4 h-full"}>
            <div className="mb-8 w-full">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                Update Details
              </h4>

{profileMessage && <p style={{"color":"green"}}>{profileMessage}</p>}
{profileError && <p style={{"color":"red"}}>{profileError}</p>}

              <div class="mt-11 flex flex-col space-y-4">
                <div>
                  <label for="business_name" class="text-xs font-semibold text-gray-501">Name</label>
                  <input
                    type="text"
                    id="business_name"
                    value={businessProfile.business_name}
                    onChange={businessProfileChange}
                    name="business_name"
		    required
                    class="mt-2 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>                
                <div>
                  <label for="business_email" class="text-xs font-semibold text-gray-501">Email</label>
                  <input
                    type="email"
                    id="business_email"
                    name="business_email"
                    value={businessProfile.business_email}
                    onChange={businessProfileChange}
		    required
                    class="mt-2 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div class="relative">
                  <label for="business_number" class="text-xs font-semibold text-gray-501">Phone number</label>
                  <input
                    type="text"
                    id="business_number"
                    name="business_number"
                    value={businessProfile.business_number}
                    onChange={businessProfileChange}
                    class="block w-full rounded border-gray-301 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div class="relative">
                  <label for="business_address" class="text-xs font-semibold text-gray-501">Address</label>
                  <input
                    type="text"
                    id="business_address"
                    name="business_address"
                    value={businessProfile.business_address}
                    onChange={businessProfileChange}
                    class="block w-full rounded border-gray-301 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4"
                  />
                </div>
                <div className="mt-5">
                  <button type="submit" className="linear mt-3 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Update business details
                  </button>
                </div>
              </div>
            </div>
          </Card>





	</form>


	{/*
        <div className="col-span-6 lg:!mb-0">
            <p>Business</p>
	</div>
	*/}

      </div>
}

    </div>
  );
};

export default ProfileOverview;
