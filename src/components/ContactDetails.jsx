import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContact } from "../context/ContactProvider";
import { e2p } from "../utils/functions";
import Loader from "../components/shared/Loader";

export default function ContactDetails() {
  const { id } = useParams();
  const { fetchContact } = useContact();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getContact = async () => {
      const contactDeatail = await fetchContact(id);
      setContact(contactDeatail.contactData);
      setLoading(false);
    };
    getContact();
  }, [id]);

  console.log(contact);

  if (loading) {
    return (
      <main className="contact-details-container">
        <Loader />
      </main>
    );
  }

  if (!contact) {
    return <div>مخاطبی پیدا نشد.</div>;
  }

  return (
    <div className="contact-details-container">
      <h1 className="contact-title">{`${contact.firstName} ${contact.lastName}`}</h1>
      <div className="contact-card">
        <div className="contact-info">
          <p>
            <span>ایمیل:</span> {contact.email}
          </p>
          <p>
            <span>شماره تماس:</span> {e2p(`0${contact.phoneNumber}`)}
          </p>
        </div>
      </div>
      <Link to="/contacts" >مشاهده مخاطبین</Link>
    </div>
  );
}
