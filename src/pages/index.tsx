import React from 'react';
// import { formatMessage } from 'umi-plugin-locale';
import Head from '@/components/Header';
import Login from '@/components/Login';
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <Head isLogin={false}/>
      <Login />
    </div>
  );
}
