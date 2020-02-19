import { useEffect, useState } from 'react';

import { auth } from '../Firebase/firebase';
import { UserAction } from '../Reducers/User.Reducer';

const useFirebaseAuth = (
  userDispatch: (value: UserAction) => void,
  setIsLoggingIn: (state: boolean) => void,
): firebase.User | null => {
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  useEffect(
    () =>
      auth.onIdTokenChanged(authUserSnapshot => {
        if (authUserSnapshot && !userAuth) {
          setUserAuth(authUserSnapshot);
          userDispatch({ type: 'LOGGED_IN', data: authUserSnapshot });
        } else if (authUserSnapshot === null) {
          setUserAuth(null);
          userDispatch({ type: 'LOGGED_OUT' });
          setIsLoggingIn(false);
        }
      }),
    [userDispatch, userAuth, setIsLoggingIn],
  );

  return userAuth;
};

export default useFirebaseAuth;