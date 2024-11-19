import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Icons,
  Label,
  ModeToggle,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@components';
import logo from '@assets/ldn_icon-70x70.webp';

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const tabsStyles = 'h-8 dark:text-slate-200 text-slate-950 text-slate-100';
  const tabButtons = [
    {
      title: 'Finanzas',
      icon: <Icons type="statistics" className={tabsStyles} />,
      path: '/app/finance',
    },
    {
      title: 'Calendario',
      icon: <Icons type="schedule" className={tabsStyles} />,
      path: '/app/schedule',
    },
    {
      title: 'Productos',
      icon: <Icons type="bag" className={tabsStyles} />,
      path: '/app/products',
    },
    {
      title: 'Variaciones',
      icon: <Icons type="stack" className={tabsStyles} />,
      path: '/app/variations',
    },
    {
      title: 'Ajustes',
      icon: <Icons type="cog_6_tooth" className={tabsStyles} />,
      path: '/app/config',
    },
  ];
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-3 align-middle">
          <a
            href="https://www.facebook.com/tiendaLDN/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logo}
              className="h-12 cursor-pointer object-scale-down transition-transform duration-300 ease-in-out hover:rotate-6 hover:scale-110"
              alt="logo-ldn"
            />
          </a>
          <Label>LDN - App</Label>
        </div>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabButtons.map(({ title, icon, path }, index) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.includes(path)}
                  >
                    <NavLink key={index} to={path}>
                      <div>{icon}</div>
                      <span className="hidden text-sm font-medium dark:text-slate-200 lg:block">
                        {title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="m-3 flex items-center">
              <ModeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
