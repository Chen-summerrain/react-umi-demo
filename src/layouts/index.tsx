import React from 'react';

import Head from '@/components/Header';
import styles from './index.less';
console.log('/index.tsx [4]--1','1-0');
console.log('/index.tsx [4]--1','2-0');
console.log('/index.tsx [4]--1','3-0');
console.log('/index.tsx [4]--1','4-0');
const BasicLayout: React.FC = props => {
  return (

    <div className={styles['layout']}>
      <Head className={styles['layout-head']} />
      <div className={styles['layout-content']}>
        {props.children}
      </div>
    </div>
  );
};

export default BasicLayout;
