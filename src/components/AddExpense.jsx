import React from "react";
import { Modal, Form, Input, DatePicker, Select, Button } from "antd";

function AddExpensesModal({
  isExpensesModalopen,
  handleExpensesCancel,
  onFinish,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Add Expense"
      open={isExpensesModalopen}
      onCancel={handleExpensesCancel}
      footer={null}
      className="font-semibold text-gray-900"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input
            type="text"
            className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the expense amount!" },
          ]}
        >
          <Input
            type="number"
            className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date!" },
          ]}
        >
          <DatePicker
            className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="w-full border-2 border-gray-300 rounded-md focus:outline-0 outline-0 focus:ring-2 focus:ring-blue-500">
            <Select.Option className="border-0" value="food">
              Food
            </Select.Option>
            <Select.Option className="border-0" value="education">
              Education
            </Select.Option>
            <Select.Option className="border-0" value="office">
              Office
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpensesModal;
