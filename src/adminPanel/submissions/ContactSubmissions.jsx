import React from "react";
import SubmissionsTable from "./SubmissionsTable";

const columns = [
  { label: "Name", field: "name" },
  { label: "Phone", field: "phone" },
  { label: "Message", field: "medicalNeeds" },
  { label: "Timestamp", field: "timestamp" },
];

const ContactSubmissions = () => {
  return (
    <SubmissionsTable
      title="Contact Submissions"
      collectionName="contactSubmissions"
      columns={columns}
    />
  );
};

export default ContactSubmissions;
