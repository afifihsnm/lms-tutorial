"use client";

import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import classes from './sidebar.module.css';
import { LogOut } from 'lucide-react';
import Logo from './logo';
import SidebarRoutes from './sidebar-routes';
import { SignOutButton } from '@clerk/nextjs';

export const Sidebar = () => {

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Logo />
        </Group>
        <SidebarRoutes />
      </div>

      <div className={classes.footer}>
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
