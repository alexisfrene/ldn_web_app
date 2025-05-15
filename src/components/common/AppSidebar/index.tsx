import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@utils";
import { GridPattern } from "@ui/grid-pattern";
import { Label } from "@ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@ui/sidebar";
import { Skeleton } from "@ui/skeleton";
import { Icons } from "@common/Icons";
import { TokenImage } from "@common/ImagePrivate";
import { useAvatar } from "@features/users/hooks/use-avatar";

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { avatar, session_token, username, email } = useAvatar();

  const tabsStyles = "h-8 dark:text-slate-200 text-slate-950 text-slate-100";
  const tabButtons = [
    {
      title: "Finanzas",
      icon: <Icons type="statistics" className={tabsStyles} />,
      path: "/app/finance",
    },
    {
      title: "Calendario",
      icon: <Icons type="schedule" className={tabsStyles} />,
      path: "/app/schedule",
    },
    {
      title: "Productos",
      icon: <Icons type="bag" className={tabsStyles} />,
      path: "/app/products",
    },
    {
      title: "Variaciones",
      icon: <Icons type="stack" className={tabsStyles} />,
      path: "/app/variations",
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="h-[8vh] bg-linear-to-b from-amber-400 to-amber-500 dark:from-slate-950 dark:to-slate-900">
        <div className="flex items-center gap-3 align-middle">
          <a
            href="https://www.facebook.com/tiendaLDN/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/ldn_icon-70x70.webp"
              className="relative h-12 cursor-pointer object-scale-down transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-6"
              alt="logo-ldn"
            />
          </a>
          <Label>LDN - App</Label>
        </div>
        <SidebarSeparator />
      </SidebarHeader>
      <SidebarContent className="relative flex h-[500px] w-full flex-col items-center overflow-hidden bg-linear-to-bl from-amber-200 to-amber-400 dark:from-slate-950 dark:to-slate-900">
        <GridPattern
          key="grid-pattern-sidebar"
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-4 inset-y-[-10%] h-[200%] skew-y-12",
          )}
        />
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tabButtons.map(({ title, icon, path }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.includes(path)}
                  >
                    <NavLink key={path} to={path}>
                      <div>{icon}</div>
                      <span className="text-sm font-medium lg:block dark:text-slate-200">
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
      {session_token && avatar && username ? (
        <SidebarFooter className="h-[6vh] bg-linear-to-t from-amber-500 to-amber-400 dark:from-slate-950 dark:to-slate-900">
          <div className="space-y-6" onClick={() => navigate("/app/config")}>
            <div className="flex items-center gap-x-2">
              <TokenImage
                url={`${avatar}?width=50&height=50&quality=50&format=webp`}
                variant="avatar"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-base font-semibold text-gray-700 capitalize dark:text-white">
                  {username}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {email}
                </p>
              </div>
            </div>
          </div>
        </SidebarFooter>
      ) : (
        <Skeleton className="h-[6vh] bg-linear-to-t from-amber-500 to-amber-400 dark:from-slate-950 dark:to-slate-900" />
      )}
    </Sidebar>
  );
};
