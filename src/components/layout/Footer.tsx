import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white px-6 md:px-12 py-12">
      <div className="w-full max-w-9xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        {/* Left: Location & Inquiry */}
        <div className="text-sm">
          <p className="text-gray-400">Based in Kathmandu, Nepal</p>
          <p className="text-gray-500 mt-1">
            inquiry: <a href="mailto:hello@bijayr.com.np" className="text-gray-300 hover:text-white transition-colors duration-300">hello@bijayr.com.np</a>
          </p>
        </div>

        {/* Right: Horizontal Social Links */}
        <div className="flex gap-8 items-center">
          <a
            href="https://www.linkedin.com/in/bijayrai-profile/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm tracking-widest uppercase"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/bjayrai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm tracking-widest uppercase"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm tracking-widest uppercase"
          >
            Upwork
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
