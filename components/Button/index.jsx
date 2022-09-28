import { LoadingIcon } from 'components/Icons/LoadingIcon';
import styles from './Button.module.css';

export const Button = ({
    onClick,
    title,
    type = 'generic',
    isLink,
    menu,
    href,
    loading,
}) =>
    isLink ? (
        <a className={`${styles.container} ${styles[type]} ${menu && styles.menuBtn}`} href={href}>
            {title}
        </a>
    ) : (
        <div
            className={`${styles.container} ${styles[type] } ${
                loading ? styles.disabled : ''
            }  ${menu && styles.menuBtn}`}
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
