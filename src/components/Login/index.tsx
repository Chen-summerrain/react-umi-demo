import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Modal, Input, Button, Form} from 'antd';

import styles from './index.less';

interface loginProps {
    dispatch: ()=>void
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
    dispatch,
    visible,
    tag,
    onCancel,
    onRegisterSuccess
}: loginProps) => {
    const [form] = Form.useForm();
    
    const {validateFields} = form;
    useEffect(() => {
        // console.log('/index.jsx [9]--1','login');
        // dispatch({type:'user/login',payload:{name:'admin',password:'admin'}})
        // dispatch({type:'user/register',payload:{name:'admin',password:'admin',email:'123@qq.com'}})
    }, [])

    const handleLogin = async() => {
        try{

            const values = await validateFields();
            dispatch({type:'login/login',payload:{...values}});
            console.log('/index.tsx [33]--1',values);
        }catch(err) {
            console.log('/index.tsx [47]--1',err);
        }
    }

    const handleRegister = async() => {
        try{

            const values = await validateFields();
            const res = await dispatch({type:'login/register',payload:{...values}});
            res&&onRegisterSuccess&&onRegisterSuccess();
        }catch(err) {
            console.log('/index.tsx [47]--1',err);
        }
    }
    return (
        <Modal
            visible={visible}
            footer={null}
            forceRender={true}
        //   onOk={this.handleOk}
          onCancel={onCancel}
        >
            {
                <Form name="login_form" form={form} validateMessages={validateMessages}>
                    <Form.Item
                        {...formItemLayout}
                        name={['name']}
                        label="Name"
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Please input your name" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name={['password']}
                        label="Password"
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Please input your password" />
                    </Form.Item>
                    {
                        tag !==1 && <Form.Item
                            {...formItemLayout}
                            name={['email']}
                            label="email"
                            rules={[{required: true}]}
                        >
                            <Input placeholder="Please input your email" />
                        </Form.Item>
                    }
                    <Form.Item {...formTailLayout}>
                        {
                            tag===1?<Button type="primary" onClick={handleLogin}>Login</Button>:
                                    <Button type="primary" onClick={handleRegister}>Register</Button>
                        }
                    </Form.Item>
                </Form>
            }
        </Modal>
    )
}

export default connect(state => ({

}))(Index);