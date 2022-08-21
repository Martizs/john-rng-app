import axios from 'axios';
import { showError } from 'lib/ui/utils';
import { useRouter } from 'next/router';

export default function AdminLogin() {
    const router = useRouter();

    const login = (e) => {
        e.preventDefault();
        axios
            .post('/api/auth/login', {
                username: e.target.username.value,
                password: e.target.password.value,
            })
            .then(() => {
                router.push('/admin');
            })
            .catch(showError);
    };

    return (
        <div>
            <form onSubmit={login}>
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
