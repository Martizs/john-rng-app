import axios from 'axios';
import { showError } from 'lib/ui/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [treasureItems, setTreasureItems] = useState([]);

    useEffect(() => {
        axios
            .get('/api/treasureItems')
            .then((resp) => {
                setTreasureItems(resp.data);
            })
            .catch(showError);
    }, []);

    // eslint-disable-next-line no-console
    console.log('treasureItems', treasureItems);

    return (
        <div className={styles.container}>
            <Link href="/admin">
                <a>go to admin</a>
            </Link>
        </div>
    );
}
