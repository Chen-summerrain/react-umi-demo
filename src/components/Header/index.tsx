import React, { useEffect, useState, useRef, useMemo, useReducer, useCallback } from 'react';
import cns from 'classname';
import {Button} from 'antd';
import { connect } from 'dva';

import Login from '../Login';
import styles from './index.less';

interface IndexProps {
    userInfo: object
    dispatch
}

const Index = ({
    userInfo,
    className,
    dispatch
}: IndexProps) => {
    const {isLogin,isAdmin} = userInfo;
    const [state,setState] = useReducer((o,n)=>({...o,...n}),{
        tag: 1,
        visible:false
    })

    useEffect(()=>{
        dispatch({type:'login/check'})
    },[dispatch, isLogin])

    useEffect(()=>{
        if(isLogin && state.tag===1) {
            setState({visible:false})
        }
    },[isLogin, state.tag])

    const handleLogin = () => {
        setState({
            tag:1,
            visible: true
        })
        // dispatch({type:'user/login',payload:{name:'admin',password:'admin'}})
    }
    const handleRegister = () => {
        setState({
            tag:2,
            visible: true
        })
    }
    const handleRegisterSuccess = () => {
        setState({tag:1})
    }
    const handleCancel = () =>{
        setState({
            visible:false
        })
    }
    const handleLogout = ()=> {
        dispatch({type:'login/logout'})
    }
    return 	(
        <div className={cns(styles.head,className)}>
            <div className={styles['head-title']}>Hello World!</div>
            <div className={styles['head-right']}>
                {
                    !isLogin ? (<>
                        <Button type="primary" onClick={handleLogin} size="small">Login</Button>
                        <Button type="primary" onClick={handleRegister} size="small">Regster</Button>
                    </>) :(<>
                        <span className={styles['head-user-icon']}></span>
                        <span className={styles['head-user-name']}>{userInfo.user}</span>
                        <Button type="link" onClick={handleLogout} size="small">Log out</Button>
                    </>)
                }
            </div>
            <Login 
                tag={state.tag}
                visible={state.visible}
                onRegisterSuccess={handleRegisterSuccess}
                onCancel={handleCancel}

            />
        </div>
    )
}

export default connect(state => {
    return ({
        userInfo:state.login
    })
})(Index);