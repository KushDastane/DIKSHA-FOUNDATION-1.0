// src/hooks/useSiteContent.js
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export function useSiteContent() {
  const [branches, setBranches] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true); // optional
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // 1. Get all branches
        const branchesSnapshot = await getDocs(collection(db, "branches"));
        const branchesList = branchesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBranches(branchesList);

        // 2. Get contact info (single doc)
        const contactDoc = await getDoc(doc(db, "contactInfo", "main"));
        setContactInfo(contactDoc.exists() ? contactDoc.data() : null);
      } catch (err) {
        console.error("Failed to load site content:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { branches, contactInfo, loading, error };
}
