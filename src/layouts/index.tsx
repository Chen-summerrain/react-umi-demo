import React from 'react';
import styles from './index.css';

console.log('/index.tsx [3]--1','test1');
const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      {props.children}
    </div>
  );
};

export default BasicLayout;
