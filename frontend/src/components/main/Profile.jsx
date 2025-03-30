import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [joinedAt, setJoinedAt] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      const currentDate = new Date();
      const month = currentDate.toLocaleString("default", { month: "long" });
      const year = currentDate.getFullYear();
      setJoinedAt(`${month} ${year}`);
    }
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl font-bold text-blue-700">Profile</h2>
      {user ? (
        <div className="mt-8 text-gray-700 text-lg">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Joined At:</span> {joinedAt}</p>
        </div>
      ) : (
        <p className="text-lg text-gray-600 mt-4">No user logged in.</p>
      )}
    </div>
  );
};

export default Profile;