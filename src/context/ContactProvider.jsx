import { createContext, useContext, useState } from "react";
import api from "../config/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ContactContext = createContext();

export const useContact = () => useContext(ContactContext);

export default function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createContact = async (newContact) => {
    setLoading(true);
    try {
      const res = await api.post("/api/contact", newContact);
      setContacts((prev) => (prev ? [...prev, res.data] : [res.data]));
      toast.success(res.data.msg);
      navigate("/contacts")
    } catch (error) {
      toast.error(error.response?.data?.msg || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/contact");
      setContacts(res.data);
      toast.success(res.data.msg);
      navigate("/contacts");
    } catch (error) {
      toast.error(error.response?.data?.msg || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  const fetchContact = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/contact/${id}`);
      toast.success(res.data.msg);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    setLoading(true);
    try {
      const res = await api.delete(`/api/delete-contact/${id}`);
      setContacts((prev) =>
        prev ? prev.filter((contact) => contact._id !== id) : []
      );
      toast.success(res.data.msg);
    } catch (error) {
      toast.error(error.response?.data?.msg || "خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  const deleteAllContacts = async () => {
    setLoading(true);
    try {
      await api.delete("/api/delete-contacts");
      setContacts([]);
      toast.success("همه مخاطبین حذف شدند");
    } catch (error) {
      toast.error("خطا در حذف مخاطبین:", error.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (id, updatedContact) => {
    setLoading(true);
    try {
      const res = await api.patch(`/api/edit-contact/${id}`, updatedContact);
      setContacts(
        (prev) =>
          prev
            ? prev.map((contact) => (contact._id === id ? res.data : contact))
            : []
      );
      toast.success(res.data.msg);
      navigate("/contacts");
    } catch (error) {
      toast.error(error.response?.data?.msg || "خطا در به‌روزرسانی مخاطب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        loading,
        contacts,
        createContact,
        fetchContact,
        fetchContacts,
        updateContact,
        deleteContact,
        deleteAllContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}
