/**
 * Created by chalosalvador on 2/7/20
 */
import React, { useState } from 'react';

import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import { Menu } from 'antd';
import { LogoutOutlined, LoginOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

const linkStyle = {};

const Navigation = (props) => {
  let location = useLocation();

  const [menuState, setMenuState] = useState({
    current: location.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  });
  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth();

  React.useEffect(() => {
    setMenuState({
      ...menuState,
      current: location.pathname
    });
  }, [location, isAuthenticated]);

  const handleClick = (e) => {
    console.log('click ', e);
    setMenuState({
      ...menuState,
      current: e.key
    });
  };

  return (
    <>
      <Menu
        mode={props.mode}
        onClick={handleClick}
        className='menu'
        theme='dark'
        selectedKeys={[menuState.current]}
        style={{
          lineHeight: '64px',
          width: 'fit-content'
        }}
      >
        <Menu.Item key={Routes.HOME}>
          <Link to={Routes.HOME} style={linkStyle}>Inicio</Link>
        </Menu.Item>

        {
          isAuthenticated
            ? <>
              <Menu.Item key={Routes.PRIVATE}>
                <Link to={Routes.PRIVATE} style={linkStyle}>Encuesta</Link>
              </Menu.Item>
              <Menu.Item key={Routes.PENDINGSURVEYS}>
                <Link to={Routes.PENDINGSURVEYS} style={linkStyle}>Encuestas</Link>
              </Menu.Item>
              <Menu.Item key={Routes.ABOUT}>
                <Link to={Routes.ABOUT} style={linkStyle}>Dashboard</Link>
              </Menu.Item>
              <Menu.SubMenu icon={<UserOutlined />} title={currentUser && currentUser.name}>
                <Menu.Item key={Routes.PROFILE}>
                  <Link to={Routes.PROFILE} style={linkStyle}>Perfil</Link>
                </Menu.Item>

                <Menu.Item key={Routes.LOGIN}>
                  <Link to={Routes.LOGOUT} className='logout-link'>
                    {
                      isCheckingAuth
                        ? <LoadingOutlined />
                        : <><LogoutOutlined /> Salir</>
                    }
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
            </>
            : <Menu.Item key={Routes.LOGIN}>
              <Link to={Routes.LOGIN}>
                {
                  isCheckingAuth
                    ? <LoadingOutlined />
                    : <><LoginOutlined /> Ingresar</>
                }
              </Link>
            </Menu.Item>
        }
      </Menu>
    </>
  );
};

export default Navigation;