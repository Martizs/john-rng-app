import { DeleteIconButton } from 'components/DeleteIconButton';
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
            <DeleteIconButton onClick={handleDelete} />
            <ReactTooltip delayShow={500} />
        </div>
    );
};
