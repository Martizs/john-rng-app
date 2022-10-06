import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import styles from './ConfirmDeleteModal.module.css';

export const ConfirmDeleteModal = ({
    isOpen,
    onRequestClose,
    title,
    onConfirm,
}) => (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className={styles.title}>{title}</div>
        <Button title="Delete" type="error" onClick={onConfirm} />
    </Modal>
);
