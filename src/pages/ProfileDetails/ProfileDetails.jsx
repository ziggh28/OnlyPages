import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getProfile } from "../../services/profileService";

const ProfileDetails = ({userProfile}) => {
  const {id} = useParams()
  const [profile, setProfile] = useState(null)
  
  useEffect(() => {
    const fetchProfile = async () => {
      const profileFetched = await getProfile(id);
      setProfile(profileFetched);
    };
    fetchProfile();
  }, [id,userProfile]);

  return (
    profile && userProfile&&
    <>
    <h1 className="font-bold text-black-500 text-3xl text-center mx-4 py-4 bg-gray-300 my-2">{profile.name}'s Profile</h1>
      {profile.avatar?
        <img
        src={profile.avatar}
        alt={profile.name}
        avatar
        className="flex justify-center card__media  w-screen md:w-full object-contain h-60 w-full m-4"
      />:
        <FaUserCircle size={70} className="flex justify-center card__media  w-screen md:w-full object-contain h-60 w-full" />
      }
      {userProfile._id===profile._id && <Link to="/profile/edit">
      <button className="mx-4 w-full py-2 border text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-300">
        EDIT BUTTON</button></Link>}
        <h3 className="mx-4 font-bold text-black-500 text-3xl text-center py-4 bg-gray-300 my-2">Friends List</h3>
        <div className="mx-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {profile.friends.map((friend) => (
           <div className="md:p-8 p-2 h-90 border-transparent bg-blue-100 shadow-xl mx-2 my-2 w-full ">
            <Link
              key={profile._id}
              to={{
                pathname: `/profiles/${friend._id}`,
              }}
            >
              {friend.avatar ? (
                <img 
                className="rounded-full flex justify-center md:w-full h-60 w-full"
                src={friend.avatar} alt={friend.name} avatar />
              ) : (
                <FaUserCircle size={70} className="flex justify-center card__media  w-screen md:w-full object-contain h-60 w-full" />
              )}
              <section className="font-bold text-black-500 text-xl text-center">{friend.name}</section>
            </Link>
           </div>
        ))}
        </div>
        <div>
          <h3 className="mx-4 font-bold text-black-500 text-3xl text-center py-4 bg-gray-300 my-2">Read Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {profile.read.map((book) => (
            <a href={`/books/${book.api_id}`}>
              <img
                src={`http://books.google.com/books/content?id=${book.api_id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                alt={`${book.title} front cover`}
                className="flex justify-center card__media w-screen md:w-full object-contain h-60 rounded-md w-full py-2"
              />
            </a>
          ))}
        {/* </div> */}
        </div>
        </div>
        <div>
          <h3 className="mx-4 font-bold text-black-500 text-3xl text-center py-4 bg-gray-300 my-2"> Currently Reading Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {profile.currentlyReading.map((book) => (
            <a href={`/books/${book.api_id}`}>
              <img
                src={`http://books.google.com/books/content?id=${book.api_id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                alt={`${book.title} front cover`}
                className="flex justify-center card__media w-screen md:w-full object-contain h-60 w-full  rounded-md py-2"
              />
            </a>
          ))}
        </div>
        </div>
        <div>
          <h3 className="mx-4 font-bold text-black-500 text-3xl text-center py-4 bg-gray-300 my-2"> Want to Read Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {profile.wantToRead.map((book) => (
            <a href={`/books/${book.api_id}`}>
              {}
              <img
                src={`http://books.google.com/books/content?id=${book.api_id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                alt={`${book.title} front cover`}
                className="flex justify-center card__media w-screen md:w-full object-contain h-60 w-full rounded-md py-2"
              />
            </a>
          ))}
         </div>
        </div>
      </>
    )
};

export default ProfileDetails;
