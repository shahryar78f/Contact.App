import { useParams } from "react-router-dom";
import { useContact } from "../context/ContactProvider";
import CustomBtn from "./shared/CustomBtn";
import CustomInp from "./shared/CustomInp";
import { useEffect, useState } from "react";

export default function CreateContact() {
  const { createContact, updateContact, contacts } = useContact();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
  });

  useEffect(() => {
    if (id) {
      const contactToEdit = contacts?.contactData?.length
        ? contacts?.contactData?.find((contact) => contact._id === id)
        : [];

      if (contactToEdit) {
        setForm(contactToEdit);
      }
    }
  }, [id, contacts]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (id) {
        await updateContact(id, form);
      } else {
        await createContact(form);
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h1 className="contact-title">{id ? "ویرایش مخاطب" : "ایجاد مخاطب"}</h1>
      <div className="contact-form">
        <CustomInp
          type="text"
          name="firstName"
          label="نام *"
          value={form.firstName}
          onChange={onChange}
        />
        <CustomInp
          type="text"
          name="lastName"
          label="نام خانوادگی"
          value={form.lastName}
          onChange={onChange}
        />
        <CustomInp
          type="text"
          name="email"
          label="ایمیل *"
          value={form.email}
          onChange={onChange}
        />
        <CustomInp
          type="number"
          name="phoneNumber"
          label="شماره تماس *"
          value={form.phoneNumber}
          onChange={onChange}
        />
      </div>
      <CustomBtn
        classNames={`custom-btn ${loading ? "loading" : "not-loading"}`}
        type="button"
        disabled={loading}
        isLoading={loading}
        onClick={handleSubmit}
        title={id ? "به‌روزرسانی مخاطب" : "ایجاد مخاطب"}
      />
    </div>
  );
}
