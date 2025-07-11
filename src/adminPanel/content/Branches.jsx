import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    mapEmbedUrl: "",
    comingSoon: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState({});

  // Fetch branches from Firestore
  const fetchBranches = async () => {
    const snapshot = await getDocs(collection(db, "branches"));
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBranches(list);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // Add new branch
  const handleAdd = async (e) => {
    e.preventDefault();
    const { name, address, mapEmbedUrl, comingSoon } = form;

    if (!name || !address || (!comingSoon && !mapEmbedUrl)) {
      toast.error("Please fill all required fields.");
      return;
    }

    await addDoc(collection(db, "branches"), form);
    toast.success("Branch added!");
    setForm({ name: "", address: "", mapEmbedUrl: "", comingSoon: false });
    fetchBranches();
  };

  // Update existing branch
  const handleUpdate = async (id) => {
    const { name, address, mapEmbedUrl, comingSoon } = editingForm;

    if (!name || !address || (!comingSoon && !mapEmbedUrl)) {
      toast.error("Please fill all required fields.");
      return;
    }

    await updateDoc(doc(db, "branches", id), editingForm);
    toast.success("Branch updated.");
    setEditingId(null);
    setEditingForm({});
    fetchBranches();
  };

  // Delete a branch
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "branches", id));
    toast.success("Branch deleted.");
    fetchBranches();
  };

  // Toggle "Coming Soon"
  const handleToggleComingSoon = async (id, currentValue) => {
    await updateDoc(doc(db, "branches", id), { comingSoon: !currentValue });
    toast.success(`Marked as ${!currentValue ? "Coming Soon" : "Active"}`);
    fetchBranches();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Branches</h2>

      {/* Add Form */}
      <form
        onSubmit={handleAdd}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Branch name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Google Maps Embed URL"
          value={form.mapEmbedUrl}
          onChange={(e) => setForm({ ...form, mapEmbedUrl: e.target.value })}
          className={`border px-3 py-2 rounded ${
            form.comingSoon ? "bg-gray-100" : ""
          }`}
          disabled={form.comingSoon}
          required={!form.comingSoon}
        />
        {form.comingSoon && (
          <p className="text-xs text-gray-500 col-span-full">
            🛈 Map URL is not required when "Coming Soon" is checked.
          </p>
        )}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.comingSoon}
            onChange={(e) => setForm({ ...form, comingSoon: e.target.checked })}
          />
          <label className="text-sm">Coming Soon?</label>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Branch
        </button>
      </form>

      {/* Branches Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Map Preview</th>
              <th className="px-4 py-2">Coming Soon</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b) => (
              <tr key={b.id} className="border-t align-top">
                <td className="px-4 py-2">
                  {editingId === b.id ? (
                    <input
                      value={editingForm.name}
                      onChange={(e) =>
                        setEditingForm({ ...editingForm, name: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    b.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === b.id ? (
                    <input
                      value={editingForm.address}
                      onChange={(e) =>
                        setEditingForm({
                          ...editingForm,
                          address: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    b.address
                  )}
                </td>
                <td className="px-4 py-2 w-64">
                  {editingId === b.id ? (
                    <>
                      <input
                        type="text"
                        value={editingForm.mapEmbedUrl}
                        onChange={(e) =>
                          setEditingForm({
                            ...editingForm,
                            mapEmbedUrl: e.target.value,
                          })
                        }
                        disabled={editingForm.comingSoon}
                        className="border px-2 py-1 rounded w-full text-xs bg-white disabled:bg-gray-100"
                        placeholder="Paste Google Maps embed URL"
                      />
                      {editingForm.comingSoon && (
                        <p className="text-xs text-gray-500 mt-1">
                          🛈 Map URL is disabled when marked as Coming Soon.
                        </p>
                      )}
                    </>
                  ) : b.mapEmbedUrl ? (
                    <iframe
                      src={b.mapEmbedUrl}
                      width="100%"
                      height="100"
                      className="rounded border"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  ) : (
                    <span className="text-gray-500 italic">No URL</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={b.comingSoon}
                    onChange={() => handleToggleComingSoon(b.id, b.comingSoon)}
                  />
                </td>
                <td className="px-4 py-2 space-x-2 text-nowrap">
                  {editingId === b.id ? (
                    <button
                      onClick={() => handleUpdate(b.id)}
                      className="text-green-600 font-medium"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(b.id);
                        setEditingForm({
                          name: b.name || "",
                          address: b.address || "",
                          mapEmbedUrl: b.mapEmbedUrl || "",
                          comingSoon: !!b.comingSoon,
                        });
                      }}
                      className="text-blue-600 font-medium"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {branches.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No branches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Branches;
