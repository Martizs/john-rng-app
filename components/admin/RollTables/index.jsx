import axios from 'axios';
import { Button } from 'components/Button';
import { ConfirmDeleteModal } from 'components/ConfirmDeleteModal';
import { LoadingIcon } from 'components/Icons/LoadingIcon';
import { InputField } from 'components/InputField';
import { Modal } from 'components/Modal';
import { RollTable } from 'components/RollTable';
import { showError } from 'lib/ui/utils';
import { useEffect, useRef, useState } from 'react';
import styles from './RollTables.module.css';

export const RollTables = () => {
    const [addEditTable, setAddEditTable] = useState(false);
    const [rollTables, setRollTables] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [loadingTables, setLoadingTables] = useState(false);
    const [showTableDelete, setShowTableDelete] = useState(null);
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

    const onSaveTable = () => {
        let method = 'post';
        const body = { title: createTitle.current };
        if (addEditTable._id) {
            method = 'put';
            body.tableId = addEditTable._id;
        }

        axios[method]('/api/admin/rollTables', body)
            .then((resp) => {
                const table = resp.data;

                const newRollTables = [...rollTables];
                if (addEditTable._id) {
                    const editedIndex = newRollTables.findIndex(
                        (rollTable) => rollTable._id === addEditTable._id
                    );

                    newRollTables[editedIndex] = {
                        ...newRollTables[editedIndex],
                        ...table,
                    };
                } else {
                    newRollTables.unshift({
                        items: [],
                        ...table,
                    });
                }

                setRollTables(newRollTables);
            })
            .catch(showError)
            .finally(() => {
                handleCreateClose();
            });
    };

    const handleCreateClose = () => {
        createTitle.current = undefined;
        setAddEditTable(false);
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

    const handleOnTableDelete = (tableId) => {
        setShowTableDelete(null);
        onTableDelete(tableId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.subMenuContainer}>
                <div
                    onClick={() => setAddEditTable({})}
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
                            onTableDelete={() => setShowTableDelete(rollTable)}
                            onTableEdit={() => setAddEditTable(rollTable)}
                        />
                    ))}
                </div>
            )}
            <Modal isOpen={!!addEditTable} onRequestClose={handleCreateClose}>
                {addEditTable && (
                    <div className={styles.addModalContainer}>
                        <InputField
                            placeholder="Title"
                            defaultValue={addEditTable.title}
                            onChange={(e) =>
                                (createTitle.current = e.target.value)
                            }
                        />
                        <Button
                            title="Save"
                            type="success"
                            onClick={onSaveTable}
                        />
                    </div>
                )}
            </Modal>
            <ConfirmDeleteModal
                isOpen={!!showTableDelete}
                onRequestClose={() => setShowTableDelete(null)}
                title={`Are you sure you want to delete table - ${showTableDelete?.title} ?`}
                onConfirm={() => handleOnTableDelete(showTableDelete?._id)}
            />
        </div>
    );
};
