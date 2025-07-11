import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
  flagged: "bg-red-100 text-red-700",
};

const SubmissionsTable = ({ title, collectionName, columns }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const snap = await getDocs(collection(db, collectionName));
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmissions(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [collectionName]);

  const updateStatus = async (id, newStatus) => {
    try {
      const ref = doc(db, collectionName, id);
      await updateDoc(ref, { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      fetchSubmissions();
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?"))
      return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Deleted successfully.");
      fetchSubmissions();
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 font-poppins">
        {title}
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : submissions.length === 0 ? (
        <p className="text-gray-500">No submissions found.</p>
      ) : (
        <div className="overflow-auto border rounded-lg shadow">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                {columns.map((col) => (
                  <th key={col.field} className="px-4 py-3 border-b">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 border-b">Status</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.field} className="px-4 py-2">
                      {col.field === "timestamp"
                        ? new Date(
                            item[col.field]?.seconds * 1000
                          ).toLocaleString()
                        : item[col.field] || "—"}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusColors[item.status || "pending"]
                      }`}
                    >
                      {item.status || "pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2 text-xs">
                    <button
                      onClick={() => updateStatus(item.id, "done")}
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => updateStatus(item.id, "flagged")}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                    >
                      Flag
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubmissionsTable;
