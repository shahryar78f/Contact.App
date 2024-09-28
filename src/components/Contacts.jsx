import { Table } from "antd";
import Loader from "./shared/Loader";
import { contactsColumns } from "../constants/tableColumns";
import { contactsDataSourse } from "../constants/tableDataSourse";
import { useEffect, useState } from "react";
import { useContact } from "../context/ContactProvider";
import CustomBtn from "./shared/CustomBtn";
import { Trash } from "./shared/Icons";
import CustomModal from "./shared/CustomModal";
import SearchBox from "./shared/SearchBox";
import { Link, useSearchParams } from "react-router-dom";
import { searchContacts } from "../utils/functions";

export default function Contacts() {
  const { contacts, fetchContacts, loading, deleteAllContacts } = useContact();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayContacts, setDisplayContacts] = useState([]);
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setDisplayContacts(contacts?.contactData || []);
  }, [contacts?.contactData]);

  useEffect(() => {
    setSearchParams({ search: search });
    setDisplayContacts(searchContacts(contacts?.contactData || [], search));
  }, [search]);

  console.log(contacts?.contactData);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const showDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteAllContacts();
      setConfirmLoading(false);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting contact:", error);
      setConfirmLoading(false);
    }
  };

  if (contacts?.success !== true) {
    return (
      <main className="contact-page_details">
        <p>خطا در دریافت اطلاعات</p>
      </main>
    );
  }

  return (
    <div className="contact-page_details">
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <h3>مخاطبین</h3>
          <div>
            <div className="btn-search_container">
              <div className="delete-add_container">
                <Link to="/create-contact" className="contact-link">
                  افزودن مخاطب
                </Link>
                {contacts?.contactData?.length > 0 && (
                  <CustomBtn
                    disabled={loading}
                    onClick={showDeleteModal}
                    classNames="pop-btn pop-btn_delete pop-btn_delete-all"
                    title={
                      loading ? (
                        <Loader width={15} height={15} />
                      ) : (
                        <div className="pop-btn_delete_icon">
                          <Trash />
                          <p>حذف</p>
                        </div>
                      )
                    }
                  />
                )}
              </div>
              <SearchBox search={search} setSearch={setSearch} />
            </div>
            <Table
              columns={contactsColumns}
              dataSource={contactsDataSourse(displayContacts)}
              pagination={false}
              scroll={{ x: true }}
            />
          </div>
        </>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        confirmLoading={confirmLoading}
        title="حذف همه مخاطبین"
        content="آیا مطمئن هستید که می‌خواهید تمام مخاطبین را حذف کنید؟"
      />
    </div>
  );
}
