import React, { useEffect, useState, useRef, useMemo, useReducer, useCallback } from 'react';
import { connect } from 'dva';
import Table from './components/EditableTable';

import styles from './index.less';

const Index = ({

}) => {

    return 	(
        <div>
            <Table />
        </div>
    )
}

export default connect(state => ({

}))(Index);