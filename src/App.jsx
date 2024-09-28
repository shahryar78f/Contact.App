import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import ContactProvider from "./context/ContactProvider";
import CreateContactPage from "./pages/CreateContactPage";
import { Toaster } from "react-hot-toast";
import ContactDetailsPage from "./pages/ContactDetailsPage";

export default function App() {
  return (
    <ContactProvider>
      <Toaster position="top-center" />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/contacts/:id" element={<ContactDetailsPage />} />
        <Route path="/create-contact" element={<CreateContactPage />} />
        <Route path="/create-contact/:id" element={<CreateContactPage />} />
      </Routes>
    </ContactProvider>
  );
}
