import React from 'react';
import styles from './index.css';

console.log('/index.tsx [3]--1','12');
console.log('/index.tsx [3]--1','test1');
console.log('/index.tsx [5]--1','test11');
console.log('/index.tsx [6]--1','test2');
console.log('/index.tsx [7]--1','test1-11');
const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      {props.children}
    </div>
  );
};

export default BasicLayout;
