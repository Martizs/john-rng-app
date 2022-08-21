import styles from './Button.module.css';

export const Button = ({ onClick, title }) => (
    <div className={styles.container} onClick={onClick}>
        {title}
    </div>
);
