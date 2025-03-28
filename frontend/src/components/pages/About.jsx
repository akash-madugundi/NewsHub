import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-3xl font-bold text-blue-700">About NewsHub</h1>
      <p className="text-lg text-gray-600 mt-4">
        NewsHub is your go-to platform for the latest news updates, bringing real-time headlines from around the world.
        We source our news from <span className="font-semibold">NewsAPI.org</span> to keep you informed and updated.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-600">About the Developer</h2>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">M. Akash</span><br />
          Roll No: <span className="font-semibold">CS22B037</span><br />
          Department of Computer Science & Engineering<br />
          <span className="font-semibold">IIT Tirupati</span>
        </p>
      </div>
    </div>
  );
};

export default About;