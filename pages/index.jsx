import axios from 'axios';
import { ItemCard } from 'components/ItemCard';
import { showError } from 'lib/ui/utils';
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
            <div className={styles.mainContainer}>
                {treasureItems.map((treasureItem) => (
                    <ItemCard
                        key={treasureItem._id}
                        title={treasureItem.title}
                        description={treasureItem.description}
                    />
                ))}
            </div>
        </div>
    );
}
