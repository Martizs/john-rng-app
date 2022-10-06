import axios from 'axios';
import { Button } from 'components/Button';
import { LoadingIcon } from 'components/Icons/LoadingIcon';
import { InputField } from 'components/InputField';
import { Modal } from 'components/Modal';
import { RollTable } from 'components/RollTable';
import { showError } from 'lib/ui/utils';
import { useEffect, useRef, useState } from 'react';
import styles from './RollTables.module.css';

export const RollTables = () => {
    const [createTable, setCreatetable] = useState(false);
    const [rollTables, setRollTables] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [loadingTables, setLoadingTables] = useState(false);
    const createTitle = useRef();

    useEffect(() => {
        loadInitalData();
    }, []);

    const loadAllItems = async () => {
        try {
            const allItemsResp = await axios.get('/api/admin/items');

            setAllItems(
                allItemsResp.data.data.map((item) => ({
                    value: item._id,
                    label: item.title,
                    title: item.title,
                    _id: item._id,
                    description: item.description,
                    adminDescription: item.adminDescription,
                }))
            );
        } catch (error) {
            showError(error);
        }
    };

    const loadInitalData = async () => {
        setLoadingTables(true);

        try {
            const rollTablesResp = await axios.get('/api/admin/rollTables');
            setRollTables(rollTablesResp.data);

            await loadAllItems();
        } catch (error) {
            showError(error);
        } finally {
            setLoadingTables(false);
        }
    };

    const onCreate = () => {
        axios
            .post('/api/admin/rollTables', { title: createTitle.current })
            .then(() => loadRollTables())
            .catch(showError)
            .finally(() => {
                handleCreateClose();
            });
    };

    const handleCreateClose = () => {
        createTitle.current = undefined;
        setCreatetable(false);
    };

    const loadRollTables = () => {
        setLoadingTables(true);
        axios
            .get('/api/admin/rollTables')
            .then((resp) => setRollTables(resp.data))
            .catch(showError)
            .finally(() => {
                setLoadingTables(false);
            });
    };

    const onTableDelete = (tableId) => {
        axios
            .delete('/api/admin/rollTables', { data: { tableId } })
            .then(() =>
                setRollTables(
                    rollTables.filter((rollTable) => rollTable._id !== tableId)
                )
            )
            .catch(showError);
    };

    return (
        <div className={styles.container}>
            <div className={styles.subMenuContainer}>
                <div
                    onClick={() => setCreatetable(true)}
                    className={styles.subMenuItem}
                >
                    <span>Create table</span>
                </div>
            </div>

            {loadingTables ? (
                <LoadingIcon width={200} height={200} />
            ) : (
                <div className={styles.tablesContainer}>
                    {rollTables.map((rollTable) => (
                        <RollTable
                            key={rollTable._id}
                            title={rollTable.title}
                            _id={rollTable._id}
                            initialTableItems={rollTable.items}
                            allItems={allItems}
                            reloadItems={loadAllItems}
                            onTableDelete={() => onTableDelete(rollTable._id)}
                        />
                    ))}
                </div>
            )}
            <Modal isOpen={createTable} onRequestClose={handleCreateClose}>
                <div className={styles.addModalContainer}>
                    <InputField
                        placeholder="Title"
                        onChange={(e) => (createTitle.current = e.target.value)}
                    />
                    <Button title="Add" type="success" onClick={onCreate} />
                </div>
            </Modal>
        </div>
    );
};
