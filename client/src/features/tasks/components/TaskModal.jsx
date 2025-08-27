// src/features/tasks/components/TaskModal.jsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const TaskModal = ({
  open,
  onClose,
  onSubmit,
  editingTask,
  defaultStatus = 'todo',
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (editingTask) {
        form.setFieldsValue(editingTask);
      } else {
        form.resetFields();
        form.setFieldsValue({ status: defaultStatus });
      }
    }
  }, [open, editingTask, defaultStatus, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title={editingTask ? 'Edit Task' : 'Create New Task'}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {editingTask ? 'Update' : 'Create'}
        </Button>,
      ]}
      width={600}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <TextArea rows={4} placeholder="Enter task description" />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="status"
            label="Status"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select placeholder="Select status">
              <Option value="todo">To Do</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="done">Done</Option>
              <Option value="in-qa">In-QA</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please select a priority' }]}
          >
            <Select placeholder="Select priority">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="assignee"
          label="Assignee"
          rules={[{ required: true, message: 'Please enter an assignee' }]}
        >
          <Input placeholder="Enter assignee name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
