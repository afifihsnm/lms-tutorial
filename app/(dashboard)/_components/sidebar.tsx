"use client";

import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import classes from './sidebar.module.css';
import { LogOut, NotebookPen, X } from 'lucide-react';
import Logo from './logo';
import SidebarRoutes from './sidebar-routes';
import { SignOutButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isTeacher } from '@/lib/teacher';

export const Sidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Logo />
        </Group>
        <SidebarRoutes />
      </div>

      <div className={classes.footer}>
        {isTeacherPage || isCoursePage ? (
          <Link href="/home" className={classes.link}>
            {/* <Button size="sm" variant="ghost"> */}
              <X className={classes.linkIcon} />
              Exit
            {/* </Button> */}
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses" className={classes.link}>
            {/* <Button size="sm" variant="ghost"> */}
              <NotebookPen className={classes.linkIcon} />
              Teacher mode
            {/* </Button> */}
          </Link>
        ) : null}
        {/* <a href="#" onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Teacher mode</span>
        </a> */}

        <SignOutButton>
          <div className={classes.linkFooter}>
            <LogOut className={classes.linkIcon} />
            <button>Logout</button>
          </div>
        </SignOutButton>
      </div>
    </nav>
  );
};

export default Sidebar;
