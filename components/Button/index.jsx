import styles from './Button.module.css';

export const Button = ({ onClick, title, type = 'generic', isLink, href }) =>
    isLink ? (
        <a className={`${styles.container} ${styles[type]}`} href={href}>
            {title}
        </a>
    ) : (
        <div
            className={`${styles.container} ${styles[type]}`}
            onClick={onClick}
        >
            {title}
        </div>
    );
