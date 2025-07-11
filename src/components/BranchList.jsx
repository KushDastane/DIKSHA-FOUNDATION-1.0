import React from "react";
import { MapPin } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";

const BranchList = () => {
  const { branches, loading, error } = useSiteContent();

  if (loading) return <p>Loading branches...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!branches || branches.length === 0) return <p>No branches found.</p>;

  return (
    <div className="grid sm:grid-cols-2 gap-6 mb-6">
      {branches.map((branch, index) => (
        <div
          key={branch.id || index}
          className={`flex items-start gap-3 ${
            branch.comingSoon ? "opacity-70" : ""
          }`}
        >
          <MapPin className="text-red-600 mt-1 shrink-0" />
          <div>
            <h4 className="font-semibold font-poppins">{branch.name}</h4>
            <p className="text-gray-500">{branch.address}</p>
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
