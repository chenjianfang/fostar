import { render as renderAmis } from 'amis';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import loadScript from 'utils/loadScript';

import { fetcher, isCancel } from './common/amisHttp';

/**
 * 低代码页面入口
 * @returns {JSX.Element}
 * @constructor
 */
function Lowcode() {
  const [schema, setSchema] = useState({});

  const location = useLocation();

  const updateAmisPage = async () => {
    const schemaName = location.pathname.split('lowcode/')[1];
    if (!schemaName) {
      message.error('路由缺少lowcode参数');
      return;
    }

    await loadScript(`/amis-schema/${schemaName}.js`);
    if (!window.amisSchema) return;

    setSchema(window.amisSchema);
  };

  useEffect(() => {
    updateAmisPage();
  }, [location]);

  return (
    <div id="lowcodeRoot" className="amis-scope">
      {renderAmis(
        schema,
        {},
        {
          fetcher,
          isCancel,
          theme: 'antd',
        },
      )}
    </div>
  );
}

export default Lowcode;
