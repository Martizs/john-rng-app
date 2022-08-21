import axios from 'axios';
import styles from './AdminLogin.module.css';
import { InputField } from 'components/InputField';
import { Button } from 'components/Button';
import { showError } from 'lib/ui/utils';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function AdminLogin() {
    const router = useRouter();

    const username = useRef();
    const password = useRef();

    const login = (e) => {
        e.preventDefault();
        axios
            .post('/api/auth/login', {
                username: username.current,
                password: password.current,
            })
            .then(() => {
                router.push('/admin');
            })
            .catch(showError);
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <InputField
                    placeholder="username"
                    onChange={(e) => (username.current = e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="password"
                    onChange={(e) => (password.current = e.target.value)}
                />
                <Button onClick={login} title="Login" />
            </div>
        </div>
    );
}
