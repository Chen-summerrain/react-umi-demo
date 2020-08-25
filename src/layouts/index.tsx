import React from 'react';

import Head from '@/components/Header';
import styles from './index.less';

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
