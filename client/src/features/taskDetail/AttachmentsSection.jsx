import React, { useState } from 'react';
import { Upload, Button, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AttachmentsSection = ({ taskId }) => {
  const [files, setFiles] = useState([]);

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      setFiles((prev) => [...prev, file]);
      onSuccess('ok');
    }, 500);
  };

  return (
    <div>
      <h4>Attachments</h4>
      <Upload customRequest={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>
      <List
        dataSource={files}
        renderItem={(file, index) => (
          <List.Item key={index}>{file.name}</List.Item>
        )}
        style={{ marginTop: '12px' }}
      />
    </div>
  );
};

export default AttachmentsSection;
