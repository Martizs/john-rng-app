import { LoadingIcon } from 'components/Icons/LoadingIcon';
import styles from './Button.module.css';

export const Button = ({
    onClick,
    title,
    type = 'generic',
    isLink,
    meniu,
    href,
    loading,
}) =>
    isLink ? (
        <a className={`${styles.container} ${styles[type]} ${meniu && styles.meniuBtn}`} href={href}>
            {title}
        </a>
    ) : (
        <div
            className={`${styles.container} ${styles[type] } ${
                loading ? styles.disabled : ''
            }  ${meniu && styles.meniuBtn}`}
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
