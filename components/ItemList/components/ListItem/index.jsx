import ReactTooltip from 'react-tooltip';
import { Button } from 'components/Button';
import styles from './ListItem.module.css';

export const ListItem = ({ title, tooltip, onClick, onDelete }) => {
    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <div className={styles.container} onClick={onClick} data-tip={tooltip}>
            <div className={styles.title}>{title}</div>
            <Button onClick={handleDelete} title="Delete" type="error" />
            <ReactTooltip delayShow={500} />
        </div>
    );
};
