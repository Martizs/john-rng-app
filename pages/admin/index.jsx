import axios from 'axios';
import { Auth } from 'components/Auth';
import { AuthContext } from 'hooks/authContext';
import { showError, showSuccess } from 'lib/ui/utils';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function Admin() {
    const router = useRouter();
    const authContext = useContext(AuthContext);

    const logOut = () => {
        axios
            .post('/api/auth/logout')
            .then(() => {
                authContext.setUser(null);
                showSuccess('Logged out');
                router.push('/');
            })
            .catch(showError);
    };

    return (
        <Auth>
            <div>welcome to admin page</div>
            <button onClick={logOut}>Log out</button>
        </Auth>
    );
}
