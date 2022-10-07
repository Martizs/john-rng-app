import { Button } from 'components/Button';
import { InputField } from 'components/InputField';
import { Modal } from 'components/Modal';
import { TextArea } from 'components/TextArea';
import { useState } from 'react';
import styles from './ItemModal.module.css';

export const ItemModal = ({
    isOpen,
    onClose,
    item,
    onChange,
    onSave,
    hideAdminDesc,
}) => {
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
            height="600px"
            width="90%"
        >
            {item && (
                <div className={styles.container}>
                    <div className={styles.inputContainer}>
                        <div className={styles.label}>Title</div>
                        {item._id && !edit ? (
                            <div className={styles.text}>
                                {item.title ?? ''}
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
                                {item.description ?? ''}
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
                        {!hideAdminDesc && (
                            <>
                                <div className={styles.label}>
                                    Admin description
                                </div>
                                {item._id && !edit ? (
                                    <div className={styles.text}>
                                        {item.adminDescription ?? ''}
                                    </div>
                                ) : (
                                    <TextArea
                                        defaultValue={item.adminDescription}
                                        minRows={4}
                                        onChange={(e) =>
                                            onChange({
                                                adminDescription:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                )}
                            </>
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
