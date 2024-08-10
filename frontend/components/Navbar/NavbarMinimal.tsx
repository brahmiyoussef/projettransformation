"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconTransform,
  IconHistory,
} from '@tabler/icons-react';
import Image from 'next/image';
import classes from './NavbarMinimal.module.css'; 
import logo from '../../1762-rm.png';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
  link: string;
}

function NavbarLink({ icon: Icon, label, active, onClick, link }: NavbarLinkProps) {
  return (
    <Link href={link} passHref>
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', link: '/home' },
  { icon: IconTransform, label: 'Convert', link: '/convert' },
  { icon: IconHistory, label: 'History', link: '/history' },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <div className={classes.logoContainer}>
          <Image src={logo} alt="Attijariwafa Bank" width={60} height={45} />
        </div>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconUser} label="Account Settings" link="/profil" />
        <NavbarLink icon={IconLogout} label="Logout" link="/logout" />
      </Stack>
    </nav>
  );
}

export default NavbarMinimal;
