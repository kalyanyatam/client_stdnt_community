import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNav from "./BottomNav";
import { useNavigate } from "react-router-dom";
import SearchUsers from "./SearchUsers";

const Chat = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [contacts, setContacts] = useState([]);

  const handleUserClick = async (contact) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/chats/create",
        {
          userId1: profile._id,
          userId2: contact._id,
        },
        { withCredentials: true }
      );

      navigate(`/chat/${response.data._id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const fetchFriends = () => {
    axios
      .get("http://localhost:3000/auth/friends", { withCredentials: true })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/userprofile", { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetchFriends();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-md py-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-blue-800">StudentCommunity</h1>
      </div>

      {/* Profile Welcome */}
      <div className="text-center my-4">
        {profile ? (
          <h2 className="text-2xl font-semibold text-gray-800">
            Hello, {profile.username}!
          </h2>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>

      {/* Search Users */}
      <div className="px-4 mb-4">
        <SearchUsers onFriendAdded={fetchFriends} />
      </div>

      {/* Contacts Grid */}
      <div className="flex-grow px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300 cursor-pointer flex flex-col items-center"
              onClick={() => handleUserClick(contact)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: "#de6d6d" }}
                >
                  <span>{contact.profileTheme}</span>
                </div>
                <h2 className="text-xl font-semibold text-blue-800">
                  {contact.username}
                </h2>
              </div>
              <p className="text-gray-600 mt-2">Online</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Chat;
