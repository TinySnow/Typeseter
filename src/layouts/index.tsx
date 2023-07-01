import { ProLayout } from "@ant-design/pro-layout";
import { Link, Outlet, useAppData, useLocation } from "umi";

export default function Layout() {
  const { clientRoutes } = useAppData();
  const location = useLocation();
  return (
    <ProLayout
      route={clientRoutes[0]}
      location={location}
      title="排版器"
      fixedHeader={true}
      fixSiderbar
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path && location.pathname !== menuItemProps.path) {
          return (
            <Link to={menuItemProps.path} target={menuItemProps.target}>
              {defaultDom}
            </Link>
          );
        }
        return defaultDom;
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
