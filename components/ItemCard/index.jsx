import styles from './ItemCard.module.css';

export const ItemCard = ({ title, description }) => (
    <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
    </div>
);
