import React from "react";
import SubmissionsTable from "./SubmissionsTable";

const columns = [
  { label: "Name", field: "name" },
  { label: "Occasion", field: "occasion" },
  { label: "Phone", field: "phone" },
  { label: "Date", field: "date" },
  { label: "Timestamp", field: "timestamp" },
];

const EventBookings = () => {
  return (
    <SubmissionsTable
      title="Event Bookings"
      collectionName="eventBookings"
      columns={columns}
    />
  );
};

export default EventBookings;
