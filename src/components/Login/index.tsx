import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, Button } from 'antd';

import styles from './index.less';
import { async } from 'q';

interface loginProps {
    dispatch: any
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

const Index = ({
    dispatch
}: loginProps) => {
    const [form] = Form.useForm();
    
    // const {validateFields} = form;
    useEffect(() => {
        // console.log('/index.jsx [9]--1','login');
        // dispatch({type:'user/login',payload:{name:'admin',password:'admin'}})
        // dispatch({type:'user/register',payload:{name:'admin',password:'admin',email:'123@qq.com'}})
    }, [])

    const handleLogin = async() => {
        // const values = await validateFields();
        // console.log('/index.tsx [33]--1',values);
    }
    return (
        <Modal
            visible={true}
            footer={null}
            forceRender={true}
        //   onOk={this.handleOk}
        //   onCancel={this.handleCancel}
        >
            {
                <Form name="login_form" validateMessages={validateMessages}>
                    <Form.Item
                        {...formItemLayout}
                        name={['user', 'name']}
                        label="Name"
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Please input your name" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name={['user', 'password']}
                        label="Password"
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Please input your password" />
                    </Form.Item>
                    <Form.Item {...formTailLayout}>
                        <Button type="primary" onClick={handleLogin}>Login</Button>
                    </Form.Item>
                </Form>
            }
        </Modal>
    )
}

export default connect(state => ({

}))(Index);