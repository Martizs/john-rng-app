import { LoadingIcon } from 'components/Icons/LoadingIcon';
import styles from './Button.module.css';

export const Button = ({
    onClick,
    title,
    type = 'generic',
    isLink,
    href,
    loading,
}) =>
    isLink ? (
        <a className={`${styles.container} ${styles[type]}`} href={href}>
            {title}
        </a>
    ) : (
        <div
            className={`${styles.container} ${styles[type]} ${
                loading ? styles.disabled : ''
            }`}
            onClick={onClick}
        >
            {loading && (
                <div className={styles.loadingContainer}>
                    <LoadingIcon />
                </div>
            )}
            {title}
        </div>
    );
