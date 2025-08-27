import React, { useState } from 'react';
import { List, Input, Button, Avatar, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CommentsSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (!input.trim()) return;
    const newComment = {
      id: Date.now(),
      content: input,
      author: 'You',
      timestamp: new Date().toLocaleString(),
    };
    setComments((prev) => [...prev, newComment]);
    setInput('');
  };

  return (
    <div>
      <h4 style={{ marginBottom: '16px' }}>Comments</h4>

      <List
        dataSource={comments}
        renderItem={(item) => (
          <List.Item style={{ padding: '12px 0' }}>
            <Space align="start">
              <Avatar size="small" icon={<UserOutlined />} />
              <div>
                <Text strong>{item.author}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  {item.timestamp}
                </Text>
                <div style={{ marginTop: '4px' }}>{item.content}</div>
              </div>
            </Space>
          </List.Item>
        )}
      />

      <Input.TextArea
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a comment..."
        style={{ marginTop: '16px' }}
      />
      <Button
        type="primary"
        onClick={handleAddComment}
        style={{ marginTop: '8px' }}
      >
        Post Comment
      </Button>
    </div>
  );
};

export default CommentsSection;
