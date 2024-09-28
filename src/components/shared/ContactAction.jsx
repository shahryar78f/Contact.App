import { useState } from "react";
import { Popover } from "antd";
import CustomBtn from "../shared/CustomBtn";
import { Edit, EyeOpen, MenuDots, Trash } from "../shared/Icons";
import { Link } from "react-router-dom";
import CustomModal from "../shared/CustomModal";
import Loader from "../shared/Loader";
import { useContact } from "../../context/ContactProvider";

export default function ContactAction({ id }) {
  const { deleteContact, loading } = useContact();

  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const showDeleteModal = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmLoading(true);
    try {
      await deleteContact(id);
      setConfirmLoading(false);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting contact:", error);
      setConfirmLoading(false);
    }
  };

  const content = (
    <div className="popover">
      <Link to={`/contacts/${id}`} className="pop-btn">
        <EyeOpen />
        جزئیات
      </Link>
      <Link to={`/create-contact/${id}`} className="pop-btn">
        <Edit />
        <p>ویرایش</p>
      </Link>
      <hr />
      <CustomBtn
        disabled={deleteLoading}
        onClick={showDeleteModal}
        classNames="pop-btn pop-btn_delete"
        title={
          deleteLoading ? (
            <Loader width={15} height={15} />
          ) : (
            <div className="pop-btn_delete_icon">
              <Trash />
              <p>حذف</p>
            </div>
          )
        }
      />
    </div>
  );

  return (
    <div className="flex gap-2">
      <Popover
        open={open}
        onOpenChange={onOpenChange}
        trigger="click"
        placement="leftTop"
        content={content}
        overlayInnerStyle={{
          padding: "0",
        }}
      >
        <CustomBtn icon={<MenuDots />} classNames="icon-btn" />
      </Popover>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        confirmLoading={confirmLoading}
        title="حذف مخاطب"
        content="آیا مطمئن هستید که می‌خواهید این مخاطب را حذف کنید؟"
      />
    </div>
  );
}
