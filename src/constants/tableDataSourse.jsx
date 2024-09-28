import ContactAction from "../components/shared/ContactAction";
import { e2p } from "../utils/functions";

export const contactsDataSourse = (contacts) =>
  contacts?.map((c) => ({
    key: c._id,
    name: <p>{c.firstName}</p>,
    email: <p>{c.email}</p>,
    phone: <p>{e2p(`0${c.phoneNumber}`)}</p>,
    action: <ContactAction id={c._id} />,
  }));
