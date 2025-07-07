import React from "react";
import { MapPin } from "lucide-react";

const BranchList = () => {
  const branches = [
    {
      branchName: "VV Caring Center – Main Branch",
      location: "Thane, Pokhran, Maharashtra",
      comingSoon: false,
    },
    {
      branchName: "Manasvi Caring Center – Branch 2",
      location: "Thane",
      comingSoon: true,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-6 mb-6">
      {branches.map((branch, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            branch.comingSoon ? "opacity-70" : ""
          }`}
        >
          <MapPin className="text-red-600 mt-1" />
          <div>
            <h4 className="font-semibold font-poppins">{branch.branchName}</h4>
            <p className="text-gray-500">{branch.location}</p>
            {branch.comingSoon && (
              <p className="text-sm italic text-gray-400">Coming Soon</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchList;
