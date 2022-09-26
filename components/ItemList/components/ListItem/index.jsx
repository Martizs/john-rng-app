import ReactTooltip from 'react-tooltip';
import styles from './ListItem.module.css';

export const ListItem = ({ title, tooltip, onClick, onDelete }) => {
    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <div className={styles.container} onClick={onClick} data-tip={tooltip}>
            <div className={styles.title}>{title}</div>
            <img onClick={handleDelete} className={styles.deleteIcon} src="/icons/delete.svg" alt="delete" />
            <ReactTooltip delayShow={500} />
        </div>
    );
};
