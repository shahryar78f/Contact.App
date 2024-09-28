export const searchContacts = (contacts, search) => {
  if (!search) return contacts;

  const lowercasedSearch = search?.toLowerCase();

  const searchedContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(lowercasedSearch) ||
      contact.lastName.toLowerCase().includes(lowercasedSearch) ||
      contact.email.toLowerCase().includes(lowercasedSearch) ||
      String(contact.phoneNumber).includes(lowercasedSearch)
  );

  return searchedContacts;
};

export const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

export const createQueryObject = (currentQuery, newQuery) => {
    if (newQuery.search === "") {
      const { search, ...rest } = currentQuery;
      return rest;
    }
  
    return { ...currentQuery, ...newQuery };
  };