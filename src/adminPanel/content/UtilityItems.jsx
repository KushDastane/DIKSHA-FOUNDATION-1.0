import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const UtilityItems = () => {
  const [utilities, setUtilities] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({
    item: "",
    quantityNeeded: "",
  });

  const fetchUtilities = async () => {
    const snapshot = await getDocs(collection(db, "utilityItems"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUtilities(list);
  };

  useEffect(() => {
    fetchUtilities();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.trim() || !newQuantity.trim()) return;

    await addDoc(collection(db, "utilityItems"), {
      item: newItem,
      quantityNeeded: newQuantity,
    });
    toast.success("Utility added");
    setNewItem("");
    setNewQuantity("");
    fetchUtilities();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "utilityItems", id));
    toast.success("Deleted successfully");
    fetchUtilities();
  };

  const startEditing = (utility) => {
    setEditingId(utility.id);
    setEditingData({
      item: utility.item,
      quantityNeeded: utility.quantityNeeded,
    });
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "utilityItems", id), editingData);
    toast.success("Updated successfully");
    setEditingId(null);
    fetchUtilities();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Utility Items</h2>

      {/* Add New Form */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Utility name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="Quantity needed"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/3"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Utility
        </button>
      </form>

      {/* Table of Utilities */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Quantity Needed</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilities.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-4 py-2">
                  {editingId === u.id ? (
                    <input
                      value={editingData.item}
                      onChange={(e) =>
                        setEditingData((prev) => ({
                          ...prev,
                          item: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    u.item
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === u.id ? (
                    <input
                      value={editingData.quantityNeeded}
                      onChange={(e) =>
                        setEditingData((prev) => ({
                          ...prev,
                          quantityNeeded: e.target.value,
                        }))
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    u.quantityNeeded
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {editingId === u.id ? (
                    <button
                      onClick={() => handleUpdate(u.id)}
                      className="text-green-600 font-medium"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(u)}
                      className="text-blue-600 font-medium"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {utilities.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No utilities added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UtilityItems;
