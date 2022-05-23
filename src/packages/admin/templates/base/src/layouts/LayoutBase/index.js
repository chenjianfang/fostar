import { login } from 'admin-common';
import { Select, Tooltip } from 'antd';
import { COOKIE_DOMAIN } from 'common/constants/cookie';
import { EXPIRED_LANG, LANG } from 'common/constants/lang';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import Sidebar from '../Sidebar';
import style from './style.module.scss';

const { Option } = Select;

function LayoutBase(props) {
  // lang
  const [languageValue, setLanguageValue] = useState('zh');

  // oa
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');

  // oa
  const getUserInfo = async () => {
    const nickname = Cookies.get('oa_nickname');
    const avatar = Cookies.get('oa_avatar');
    setNickname(nickname);
    setAvatar(avatar);
  };

  const loginOutJSX = (
    <span onClick={login.loginOut} className="like_link">
      退出
    </span>
  );

  // 切换语言
  const changeLanguage = (value) => {
    Cookies.set(LANG, value, {
      expires: EXPIRED_LANG,
      domain: COOKIE_DOMAIN,
    });
    window.location.reload();
  };

  useEffect(() => {
    getUserInfo();

    // lang 根据url的lang设置默认语言
    const lang = Cookies.get('lang');
    if (lang) {
      setLanguageValue(lang);
    }
  }, []);

  return (
    <>
      <header className={style.header}>
        <div className={style.logoBox}>
          <img className={style.logoImg} src="/logo.png" />
          <div className={style.logo}>International Operation Center - IOC爱客中心</div>
        </div>
        <div>
          <Select value={languageValue} onChange={changeLanguage}>
            <Option value="zh">中文</Option>
            <Option value="en">English</Option>
          </Select>
          <img className={style.avator} src={avatar} />
          <Tooltip placement="bottom" title={loginOutJSX}>
            {nickname}
          </Tooltip>
        </div>
      </header>
      <section className={style.container}>
        <div className={style.side}>
          <Sidebar></Sidebar>
        </div>
        <div className={style.content}>{props.children}</div>
      </section>
    </>
  );
}

export default LayoutBase;
