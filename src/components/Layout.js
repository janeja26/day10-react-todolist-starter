import { NavLink, Outlet } from "react-router";
import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import{ SettingOutlined, HomeOutlined, ProfileOutlined,CheckCircleOutlined } from '@ant-design/icons';

const items = [
  {
    key: "home",
    label: <NavLink to={"/"}>Home</NavLink>,
    icon: <HomeOutlined />,
  },
  {
    key: "todolist",
    label: <NavLink to={"/todos"}>TodoList</NavLink>,
    icon: <ProfileOutlined />,
  },
  {
    key: "tododetail",
    label: <NavLink to={"todos/:key"}>TodoDetail</NavLink>,
    icon: <SettingOutlined />,
  },
   {
    key: "done",
    label: <NavLink to={"/done"}>Completed</NavLink>,
    icon: <CheckCircleOutlined />, 
  },
  {
    key: "about",
    label: <NavLink to={"/about"}>About</NavLink>,
    
  },
];

export function DefaultLayout() {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" items={items}></Menu>
      </Header>

      <Content>
        <Outlet></Outlet>
      </Content>
      <Footer>footer content</Footer>
    </Layout>
  );
}
export default DefaultLayout;
