import axios from 'axios';
import { AuthContext } from 'hooks/authContext';
import { showError } from 'lib/ui/utils';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

export const Auth = ({ children }) => {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (!authContext.user) {
            axios
                .get('/api/auth/user')
                .then((resp) => {
                    authContext.setUser(resp.data);
                })
                .catch((error) => {
                    showError(error);
                    router.push('/');
                });
        }
    }, []);

    return !authContext.user ? <></> : <>{children}</>;
};
