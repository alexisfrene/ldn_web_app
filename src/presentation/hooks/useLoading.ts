import { useEffect } from 'react';
import { useNavigation } from 'react-router-dom';
import NProgress from 'nprogress';

export const useLoading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation]);

  const startLoading = () => NProgress.start();
  const doneLoading = () => NProgress.done();

  return { startLoading, doneLoading };
};
