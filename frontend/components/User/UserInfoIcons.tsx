import React, { useEffect, useState } from 'react';
import { Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import classes from './UserInfoIcons.module.css';

interface UserInfo {
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  role?: string;
}

export function UserInfoIcons() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = Cookies.get('authToken');
        const response = await axios.get('http://your-backend-api/userinfo', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <Group wrap="nowrap">
        <Avatar src={userInfo.picture || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png'} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {userInfo.role || 'User'}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {userInfo.name}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {userInfo.email}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {userInfo.phone || 'No phone provided'}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
