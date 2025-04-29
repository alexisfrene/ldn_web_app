import { useEffect } from 'react';
import { useSessionStore } from '@global';
import { getUrlAvatar } from '@services';

export const useAvatar = () => {
  const {
    session_token,
    avatar,
    insertAvatar,
    insertEmail,
    insertUsername,
    email,
    username,
  } = useSessionStore((state) => ({
    session_token: state.session_token,
    avatar: state.avatar,
    email: state.email,
    username: state.username,
    insertAvatar: state.insertAvatar,
    insertEmail: state.insertEmail,
    insertUsername: state.insertUsername,
  }));

  useEffect(() => {
    let isMounted = true;

    const fetchAvatar = async () => {
      if (!session_token || avatar) return;

      try {
        const { avatar_url, username, email } = await getUrlAvatar();
        if (!isMounted) return;

        insertAvatar(avatar_url);
        insertEmail(email);
        insertUsername(username);
      } catch (error) {
        console.error('Error fetching avatar data:', error);
      }
    };

    fetchAvatar();

    return () => {
      isMounted = false;
    };
  }, [session_token, avatar, insertAvatar, insertEmail, insertUsername]);

  return { avatar, session_token, email, username };
};
