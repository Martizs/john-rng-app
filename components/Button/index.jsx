import styles from './Button.module.css';

export const Button = ({ onClick, title, type = 'generic' }) => (
    <div className={`${styles.container} ${styles[type]}`} onClick={onClick}>
        {title}
    </div>
);
