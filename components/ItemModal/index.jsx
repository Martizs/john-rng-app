import { Button } from 'components/Button';
import { InputField } from 'components/InputField';
import { TextArea } from 'components/TextArea';
import { useState } from 'react';
import Modal from 'react-modal';
import styles from './ItemModal.module.css';

Modal.setAppElement('#__next');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        backgroundColor: '#343434',
        height: '600px',
        width: '90%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const ItemModal = ({ isOpen, onClose, item, onChange, onSave }) => {
    const [edit, setEdit] = useState(false);

    const handleClose = () => {
        setEdit(false);
        onClose();
    };

    const handleSave = () => {
        setEdit(false);
        onSave();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={customStyles}
        >
            {item && (
                <div className={styles.container}>
                    <div className={styles.inputContainer}>
                        <div className={styles.label}>Title</div>
                        {item._id && !edit ? (
                            <div className={styles.text}>
                                {item.title ?? '-'}
                            </div>
                        ) : (
                            <InputField
                                defaultValue={item.title}
                                onChange={(e) =>
                                    onChange({ title: e.target.value })
                                }
                            />
                        )}
                        <div className={styles.label}>Description</div>
                        {item._id && !edit ? (
                            <div className={styles.text}>
                                {item.description ?? '-'}
                            </div>
                        ) : (
                            <TextArea
                                defaultValue={item.description}
                                minRows={4}
                                onChange={(e) =>
                                    onChange({ description: e.target.value })
                                }
                            />
                        )}
                        <div className={styles.label}>Admin description</div>
                        {item._id && !edit ? (
                            <div className={styles.text}>
                                {item.adminDescription ?? '-'}
                            </div>
                        ) : (
                            <TextArea
                                defaultValue={item.adminDescription}
                                minRows={4}
                                onChange={(e) =>
                                    onChange({
                                        adminDescription: e.target.value,
                                    })
                                }
                            />
                        )}
                    </div>

                    <div className={styles.buttonContainer}>
                        <div className={styles.buttonWrapper}>
                            <Button
                                type="success"
                                onClick={
                                    edit || !item._id
                                        ? () => handleSave()
                                        : () => setEdit(true)
                                }
                                title={edit || !item._id ? 'Save' : 'Edit'}
                            />
                        </div>
                        <div className={styles.buttonWrapper}>
                            <Button
                                type="error"
                                onClick={handleClose}
                                title="Close"
                            />
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};
