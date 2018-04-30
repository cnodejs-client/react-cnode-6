import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Dropdown, Avatar, Icon } from 'antd';
import styles from './Header.scss';

const menuConfig = [
  {
    key: 'all',
    name: '全部',
  },
  {
    key: 'good',
    name: '精华',
  },
  {
    key: 'share',
    name: '分享',
  },
  {
    key: 'ask',
    name: '问答',
  },
  {
    key: 'job',
    name: '招聘',
  },
  {
    key: 'dev',
    name: '测试',
  },
];

const Header = ({ user, onClickMenu }) => {
  const isLogin = user.id !== undefined;
  const userMenu = (
    <Menu className={styles.dropDown} onClick={onClickMenu}>
      <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={styles.header}>
      <a href="/">
        <div className={styles.logo} />
      </a>
      <Menu
        className={styles.menu}
        mode="horizontal"
        defaultSelectedKeys={['all']}
        onClick={onClickMenu}
      >
        {menuConfig.map(item => (
          <Menu.Item key={item.key}>{item.name}</Menu.Item>
        ))}
      </Menu>
      {isLogin ?
        (
          <Dropdown overlay={userMenu}>
            <span className={styles.account}>
              <Avatar
                className={styles.avatar}
                size="small"
                src={user.avatar}
              />
              <span>{user.name}</span>
            </span>
          </Dropdown>
        ) :
        (
          <Menu
            className={styles.account}
            mode="horizontal"
            selectable={false}
            onClick={onClickMenu}
          >
            <Menu.Item key="login">登录</Menu.Item>
          </Menu>
        )}
    </Layout.Header>
  );
};
Header.propTypes = {
  user: PropTypes.object.isRequired,
  onClickMenu: PropTypes.func.isRequired,
};

export default Header;
