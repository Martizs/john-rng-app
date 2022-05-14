import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Admin() {
    useEffect(() => {
        axios
            .get('/api/user')
            .then((res) => console.log('res', res))
            .catch((err) => console.log('err', err));
    }, []);

    return (
        <div>
            welcome to admin page
            <Link href="/">
                <a>Go home</a>
            </Link>
        </div>
    );
}
