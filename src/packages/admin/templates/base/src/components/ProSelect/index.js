import { message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

const { Option } = Select;

/**
 * 用户选择
 * @constructor
 */
function ProSelect({
  value,
  onChange = () => {},
  searchCallback = () => {},
  initSearchCallback = () => {},
  ...options
}) {
  // 下拉列表
  const [list, setList] = useState([]);
  // 搜索的值
  const [searchValue, setSearchValue] = useState('');

  const setOptionsList = (data) => {
    const userArr = data.map(({ label, value }) => {
      return {
        label,
        value,
      };
    });
    setList(userArr);
  };

  // 搜索
  const searchUser = async () => {
    if (!searchValue) return;
    try {
      const data = await searchCallback(searchValue);
      if (data) {
        setOptionsList(data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useDebounce(searchUser, 300, [searchValue]);

  useEffect(() => {
    if (!value) return;
    initSearchCallback(value).then((data) => {
      if (data) {
        setOptionsList(data);
      }
    });
  }, [value]);

  return (
    <Select
      showSearch
      allowClear
      onSearch={(value) => setSearchValue(value.trim())}
      value={value}
      onChange={onChange}
      style={{ width: 200 }}
      optionFilterProp="children"
      {...options}
    >
      {list.map((item) => (
        <Option value={item.value} key={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
}

export default ProSelect;
