import {message} from 'antd';

export const responseStatus = async (res) => {
    const {code,msg} = res ||{};
    console.log('/tools.js [5]--1',res);
    if(Number(code)===Number('0000')) {
        message.success(msg)
        return true;
    }else {
        message.error(msg)
        return false;
    }
}