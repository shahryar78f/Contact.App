import { Modal, Button } from "antd";
import { useState } from "react";

const CustomModal = ({
  isOpen,
  onClose,
  onConfirm,
  confirmLoading,
  title,
  content,
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={onConfirm}
      confirmLoading={confirmLoading}
      onCancel={onClose}
      okText="تایید"
      cancelText="لغو"
    >
      <p>{content}</p>
    </Modal>
  );
};

export default CustomModal;
