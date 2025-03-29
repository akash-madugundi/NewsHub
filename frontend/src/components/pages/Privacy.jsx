import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-6 py-10 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Privacy Policy</h1>
      <p className="mt-4 text-gray-700">
        Welcome to NewsHub. We value your privacy and are committed to protecting your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="text-gray-700 mt-2">
        We may collect non-personal data such as your browser type, device information, and interaction with our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
      <p className="text-gray-700 mt-2">
        The information collected is used to improve our website experience and analyze user engagement.
      </p>

      <h2 className="text-2xl font-semibold mt-6">3. Third-Party Services</h2>
      <p className="text-gray-700 mt-2">
        NewsHub retrieves news data from <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">NewsAPI.org</a>. 
        We do not control their data policies.
      </p>

      <h2 className="text-2xl font-semibold mt-6">4. Contact Us</h2>
      <p className="text-gray-700 mt-2">
        If you have any questions, contact us at <a className="text-blue-500 underline">akashmadugundi@gmail.com</a>.
      </p>

      <p className="mt-8 text-gray-500 text-sm">
        Designed and Developed by Madugundi Akash
      </p>
    </div>
  );
};

export default PrivacyPolicy;
