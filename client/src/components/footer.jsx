import React from "react";
import { useLanguage } from "../hooks/useLanguage";

const Footer = () => {
  const { translations } = useLanguage();

  return (
    <footer className="mt-2 bg-[#1e90ff] border-t border-gray-300 py-10 px-6 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h3 className="text-lg mb-4">{translations.aboutUs}</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.introduce}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.news}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.blog}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.contact}
              </a>
            </li>
          </ul>
        </div>

        {/* Candidate */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {translations.forCandidate}
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.findJobs}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.createCV}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.interviewSkills}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.profile}
              </a>
            </li>
          </ul>
        </div>

        {/* Employer */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {translations.forEmployer}
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.postJobs}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.findCandidates}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.recruitmentSolutions}
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                {translations.pricing}
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {translations.followUs}
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:underline">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm">
        © 2025 HireNow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
