import { Button } from 'components/Button';
import { InputField } from 'components/InputField';
import { Modal } from 'components/Modal';
import { useRef, useState } from 'react';
import styles from './RollTables.module.css';

export const RollTables = () => {
    const [createTable, setCreatetable] = useState(false);
    const createTitle = useRef();

    const onCreate = () => {
        console.log('title', createTitle.current);
    };

    const hangleCreateClose = () => {
        createTitle.current = undefined;
        setCreatetable(false);
    };

    return (
        <div className={styles.container}>
            <Button
                title="Add table"
                onClick={() => setCreatetable(true)}
                type="success"
            />
            <Modal isOpen={createTable} onRequestClose={hangleCreateClose}>
                <InputField
                    placeholder="Title"
                    onChange={(e) => (createTitle.current = e.target.value)}
                />
                <Button title="Add" type="success" onClick={onCreate} />
            </Modal>
        </div>
    );
};
