import React from "react";
import SubmissionsTable from "./SubmissionsTable";

const columns = [
  { label: "Donor Name", field: "name" },
  { label: "Phone", field: "phone" },
  { label: "Item", field: "item" },
  { label: "Quantity", field: "quantity" },
  { label: "Timestamp", field: "timestamp" },
];

const DonationSubmissions = () => {
  return (
    <SubmissionsTable
      title="Donation Submissions"
      collectionName="donationSubmissions"
      columns={columns}
    />
  );
};

export default DonationSubmissions;
