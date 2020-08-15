import React, { useEffect, useState, useRef, useMemo, useReducer, useCallback } from 'react';
import {Button} from 'antd';
import { connect } from 'dva';

import styles from './index.less';

interface IndexProps {
    userInfo: object
    dispatch
}

const Index = ({
    userInfo,
    dispatch
}: IndexProps) => {
    const isLogin = userInfo.user;
    console.log('/index.tsx [17]--1',userInfo);    
    const handleLogin = () => {
        dispatch({type:'user/login',payload:{name:'admin',password:'admin'}})
    }
    const handleRegister = () => {

    }
    return 	(
        <div className={styles.head}>
            <div className={styles['head-title']}>Hello World!</div>
            <div className={styles['head-right']}>
                {
                    !isLogin ? (<>
                        <Button type="primary" onClick={handleLogin} size="small">Login</Button>
                        <Button type="primary" onClick={handleRegister} size="small">Regster</Button>
                    </>) :(<>
                        <span className={styles['head-user-icon']}></span>
                        <span className={styles['head-user-name']}>{userInfo.user}</span>
                    </>)
                }
            </div>
        </div>
    )
}

export default connect(state => ({
    userInfo:state.user.userInfo
}))(Index);