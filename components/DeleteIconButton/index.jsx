import { DeleteIcon } from 'components/Icons/DeleteIcon';
import styles from './DeleteIconButton.module.css';

export const DeleteIconButton = ({ onClick }) => (
    <DeleteIcon className={styles.deleteIcon} onClick={onClick} />
);
