import axios from 'axios';
import { ItemCard } from 'components/ItemCard';
import { showError } from 'lib/ui/utils';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [openChest, setOpenChest] = useState(false);
    const [treasureItems, setTreasureItems] = useState([]);

    const handleToggleChest = () => {
        if (!openChest) {
            axios
                .get('/api/treasureItems')
                .then((resp) => {
                    setOpenChest(true);
                    setTreasureItems(resp.data);
                })
                .catch(showError);
        } else {
            setOpenChest(false);
            setTreasureItems([]);
        }
    };

    return (
        <div className={styles.container}>
            {openChest ? (
                <a
                    href="https://pngtree.com/freepng/an-open-treasure-chest-illustration_4619909.html?sol=downref&id=bef"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.attributionLink}
                >
                    Treasure chest clipart PNG Designed By 588ku
                </a>
            ) : (
                <a
                    href="https://pngtree.com/freepng/cartoon-brown-treasure-chest-illustration_4617990.html?sol=downref&id=bef"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.attributionLink}
                >
                    Treasure chest clipart PNG Designed By 588ku
                </a>
            )}
            <img
                onClick={handleToggleChest}
                className={styles.chestButton}
                src={
                    openChest
                        ? '/images/openChest.png'
                        : '/images/closedChest.png'
                }
            />

            <div className={styles.mainContainer}>
                {openChest && (
                    <>
                        {treasureItems.length ? (
                            <>
                                {treasureItems.map((treasureItem) => (
                                    <ItemCard
                                        key={treasureItem._id}
                                        title={treasureItem.title}
                                        description={treasureItem.description}
                                    />
                                ))}
                            </>
                        ) : (
                            <div>Chest is empty :( </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
