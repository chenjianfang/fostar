import { message, Select } from 'antd';
import jsonp from 'jsonp';
import React, { useState } from 'react';
import { useDebounce } from 'react-use';

const { Option } = Select;

/**
 * 用户选择
 * @constructor
 */
function UserSelect({ value = [], onChange }) {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // 搜索
  const searchUser = () => {
    if (!searchValue) return;
    try {
      jsonp(
        `//hrc.woa.com/v1.1/pages/chooser/data/staff.aspx?q=${encodeURIComponent(searchValue)}`,
        { timeout: 5000 },
        (err, data) => {
          if (!err) {
            const userArr = data.map(({ ID, Name }) => {
              return {
                id: ID,
                name: Name.split('(')[0],
              };
            });
            setUsers(userArr);
          }
        },
      );
    } catch (error) {
      message.error(error.message);
    }
  };
  useDebounce(searchUser, 300, [searchValue]);

  return (
    <Select
      showSearch
      allowClear
      mode="multiple"
      filterOption={false}
      onSearch={(value) => setSearchValue(value.trim())}
      value={value}
      onChange={onChange}
    >
      {users.map((item) => (
        <Option value={item.name} key={item.name}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
}

export default UserSelect;
