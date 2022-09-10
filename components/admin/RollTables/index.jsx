import axios from 'axios';
import { Button } from 'components/Button';
import { LoadingIcon } from 'components/Icons/LoadingIcon';
import { InputField } from 'components/InputField';
import { ItemList } from 'components/ItemList';
import { Modal } from 'components/Modal';
import { showError } from 'lib/ui/utils';
import { useEffect, useRef, useState } from 'react';
import styles from './RollTables.module.css';

export const RollTables = () => {
    const [createTable, setCreatetable] = useState(false);
    const [rollTables, setRollTables] = useState([]);
    const [loadingTables, setLoadingTables] = useState(false);
    const createTitle = useRef();

    useEffect(() => {
        loadRollTables();
    }, []);

    const onCreate = () => {
        axios
            .post('/api/admin/rollTables', { title: createTitle.current })
            .then(() => loadRollTables())
            .catch(showError)
            .finally(() => {
                hangleCreateClose();
            });
    };

    const hangleCreateClose = () => {
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

    console.log('rollTables', rollTables);

    return (
        <div className={styles.container}>
            <div className={styles.addTableButtonContainer}>
                <Button
                    title="Add table"
                    onClick={() => setCreatetable(true)}
                    type="success"
                />
            </div>

            {loadingTables ? (
                <LoadingIcon width={200} height={200} />
            ) : (
                <div className={styles.tablesContainer}>
                    {rollTables.map((rollTable) => (
                        <div
                            key={rollTable._id}
                            className={styles.rollTableContainer}
                        >
                            <div className={styles.rollTableTitle}>
                                {rollTable.title}
                            </div>
                            <ItemList
                                items={rollTable.items || []}
                                showPagination={false}
                                onSearch={(event) =>
                                    console.log('search', event.target.value)
                                }
                                onItemClick={(item) =>
                                    console.log('item', item)
                                }
                                onItemDelete={(id) =>
                                    console.log('delete id', id)
                                }
                            />
                        </div>
                    ))}
                </div>
            )}
            <Modal isOpen={createTable} onRequestClose={hangleCreateClose}>
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
