import { Link } from "react-router-dom";

export default function HomePageDetails() {
  return (
    <div className="container">
      <h1>مخاطبین</h1>
      <Link to="/contacts" className="contact-link">
        مشاهده مخاطبین
      </Link>
      <Link to="/create-contact" className="contact-link">
        افزودن مخاطب
      </Link>
      <Link to="https://contact-api-eight.vercel.app/" target="_blank" className="contact-link">
        مشاهده API
      </Link>
    </div>
  );
}
