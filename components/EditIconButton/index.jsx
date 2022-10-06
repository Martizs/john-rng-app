import { EditIcon } from 'components/Icons/EditIcon';
import styles from './EditIconButton.module.css';

export const EditIconButton = ({ onClick, width }) => (
    <EditIcon className={styles.editIcon} width={width} onClick={onClick} />
);
