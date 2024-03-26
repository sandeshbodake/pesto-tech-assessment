import React from "react";
import { Space, Table } from "antd";

const Tasks = () => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: text => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: text => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: text => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={[]} />;
};

export default Tasks;
