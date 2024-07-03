import React, { useState } from "react";
import { Upload, Button, Modal, UploadFile, Row, Col } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { uploadFileForPrediction } from "@/api/request";
const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const navigate = useNavigate();
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    if (newFileList.length > 1) {
      newFileList.splice(0, newFileList.length - 1);
    }
    setFileList(newFileList);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj as File);
    });

    try {
      const response = await fetch("http://localhost:8080/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        debugger;
        navigate(
          "/analyze?data=" + encodeURIComponent(JSON.stringify(result.data))
        );
      } else {
        console.error("Upload Failure");
      }
    } catch (error) {
      console.error("Upload Error", error);
    }
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const itemRender = (
    originNode: React.ReactNode,
    file: UploadFile,
    fileList: UploadFile[]
  ) => {
    return (
      <div className={styles.customThumbnail}>
        <img
          src={file.thumbUrl || file.url}
          alt={file.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.uploadContainer}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={() => false}
          className={styles["custom-upload-list-item"]}
          itemRender={itemRender}
        >
          {fileList.length === 0 && (
            <div className={styles["img_bg"]}>
              <PlusOutlined style={{ marginTop: "30vw" }} />
              <div className={styles["custom-upload-icon"]}>Upload</div>
            </div>
          )}
        </Upload>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          className={styles["custom-upload-button"]}
        >
          <UploadOutlined /> Upload
        </Button>
      </div>
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        width="90vw"
      >
        <img
          alt="example"
          className={styles["custom-upload-modal-image"]}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default App;
