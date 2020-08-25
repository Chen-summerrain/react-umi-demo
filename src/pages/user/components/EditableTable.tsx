import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Form, Table, Popconfirm, Modal, Button, Input } from 'antd';
import moment from 'moment';

import EditableCell from './EditableCell';
import { Button } from 'antd/lib/radio';

interface tableProps {
  userList: [],
  dispatch: () => void
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    string: '${label} is not validate string!',
  },

};

function EditableTable({
  userList,
  dispatch
}: tableProps) {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false)
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    dispatch({ type: 'user/getUserList' })
  }, [dispatch, editingKey, visible])

  useEffect(() => {
    setData([...userList])
  }, [userList])

  const isEditing = record => record.id === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: '',
      email: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: number) => {
    try {
      const row = await form.validateFields();
      const res = await dispatch({ type: 'user/updateUser', payload: { id, ...row } })
      console.log('/EditableTable.tsx [48]--1', 'row', res, row, id);
      if (res) {
        setEditingKey('');
      }

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const del = async (id: number) => {
    const res = await dispatch({ type: 'user/deleteUser', payload: id })
    if (res) {
      dispatch({ type: 'user/getUserList' })
    }
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
      editable: false,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: 200,
      editable: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: 240,
      editable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      width: 300,
      editable: false,
      render: (t: string) => moment(t).format('YYYY-MM-DD hh:mm:ss')
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      width: 300,
      editable: false,
      render: (t: string) => moment(t).format('YYYY-MM-DD hh:mm:ss')
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      // fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="#!"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
              </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <>
              <a disabled={editingKey !== ''} style={{ marginRight: '10px' }} onClick={() => edit(record)}>
                Edit
              </a>
              <Popconfirm title="Sure to delete?" onConfirm={() => del(record.id)}>
                <a>Delete</a>
              </Popconfirm>
            </>
          );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAddUser = async () => {
    try {

      const values = await form.validateFields();
      const res = await dispatch({ type: 'login/register', payload: { ...values } });
      console.log('/EditableTable.tsx [163]--1', 'add', res);
      if (res) {
        setVisible(false)
      }
    } catch (err) {
      console.log('/index.tsx [47]--1', err);
    }
  }
  return (
    <Form form={form} component={false}>
      <Button type="primary" style={{ marginBottom: '10px' }} onClick={() => {
        setVisible(true)
      }}>Add+</Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        rowKey={r => r.id}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
      <Modal
        visible={visible}
        footer={null}
        forceRender={true}
        //   onOk={this.handleOk}
        onCancel={() => {
          setVisible(false)
        }}
      >
        {
          <Form name="add_form" form={form} validateMessages={validateMessages}>
            <Form.Item
              {...formItemLayout}
              name={['name']}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input your name" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name={['password']}
              label="Password"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input your password" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name={['email']}
              label="email"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input your email" />
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button type="primary" onClick={handleAddUser}>Add</Button>
            </Form.Item>
          </Form>
        }
      </Modal>
    </Form>
  );
};

export default connect(state => ({
  userList: state.user.userList
}))(EditableTable);