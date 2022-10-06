import { DeleteIcon } from 'components/Icons/DeleteIcon';
import styles from './DeleteIconButton.module.css';

export const DeleteIconButton = ({ onClick, width }) => (
    <DeleteIcon className={styles.deleteIcon} width={width} onClick={onClick} />
);
