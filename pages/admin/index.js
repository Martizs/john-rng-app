import Link from 'next/link';

const Admin = () => (
    <div>
        welcome to admin page{' '}
        <Link href="/">
            <a>Go home</a>
        </Link>
    </div>
);

export default Admin;
