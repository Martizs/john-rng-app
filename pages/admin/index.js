import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Admin() {
    return (
        <div>
            welcome to admin page
            <Link href="/">
                <a>Go home</a>
            </Link>
        </div>
    );
}
