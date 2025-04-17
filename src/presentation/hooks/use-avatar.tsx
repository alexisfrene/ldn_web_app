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
    const fetchAvatar = async () => {
      if (session_token && !avatar) {
        const { avatar_url, username, email } = await getUrlAvatar();
        insertAvatar(avatar_url);
        insertEmail(email);
        insertUsername(username);
      }
    };

    fetchAvatar();
  }, [session_token, avatar, insertAvatar]);

  return { avatar, session_token, email, username };
};
