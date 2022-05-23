import React, { useEffect, useState } from 'react';

import style from './style.module.scss';

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, []);

  return <div className={style.home}>首页 {count}</div>;
}
