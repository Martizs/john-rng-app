import axios from 'axios';
import { SearchDropdown } from 'components/SearchDropdown';
import { RollTable } from 'components/RollTable';
import { showError, showSuccess } from 'lib/ui/utils';
import { useEffect, useRef, useState } from 'react';
import styles from './Roll.module.css';
import { Button } from 'components/Button';
import { InputField } from 'components/InputField';
import { random } from 'lodash';

export const Roll = () => {
    const [rollTables, setRollTables] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [randomItems, setRandomItems] = useState([]);

    const itemNumber = useRef();

    const loadInitalData = async () => {
        try {
            const rollTablesResp = await axios.get('/api/admin/rollTables');
            setRollTables(
                rollTablesResp.data.map((rollTable) => ({
                    ...rollTable,
                    value: rollTable._id,
                    label: rollTable.title,
                }))
            );
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

            const treasureResp = await axios.get('/api/treasureItems');
            setRandomItems(treasureResp.data);
        } catch (error) {
            showError(error);
        }
    };

    const randomizeItems = () => {
        if (
            itemNumber.current &&
            parseInt(itemNumber.current) &&
            parseInt(itemNumber.current) > 0
        ) {
            let number = parseInt(itemNumber.current);
            let randomizedItems = [];

            if (number < selectedTable.items.length) {
                const itemsToRandomize = [...selectedTable.items];

                while (number > 0) {
                    // ranges are inclusive
                    const randomIndex = random(0, itemsToRandomize.length - 1);

                    randomizedItems.push(itemsToRandomize[randomIndex]);

                    itemsToRandomize.splice(randomIndex, 1);
                    number--;
                }
            } else {
                // show all items, basically create a duplicate table
                randomizedItems = selectedTable.items;
            }

            setRandomItems(randomizedItems);
        } else {
            showError('Incorrect input');
        }
    };

    useEffect(() => {
        loadInitalData();
    }, []);

    const setTableItems = (newTableItems) => {
        const newSelectedTable = { ...selectedTable };
        newSelectedTable.items = newTableItems;
        setSelectedTable(newSelectedTable);
    };

    const showChest = () => {
        axios
            .post('/api/admin/treasureItems', { treasureItems: randomItems })
            .then(() => {
                showSuccess('Treasure is ready');
            })
            .catch(showError);
    };

    const deleteChest = () => {
        axios
            .delete('/api/admin/treasureItems')
            .then(() => {
                setRandomItems([]);
            })
            .catch(showError);
    };

    return (
        <div className={styles.container}>
            <div className={styles.slimContainer}>
                <SearchDropdown
                    options={rollTables}
                    placeholder="Select table"
                    onChange={setSelectedTable}
                    value={null}
                />
                {selectedTable && (
                    <>
                        <RollTable
                            title={selectedTable.title}
                            _id={selectedTable._id}
                            tableItems={selectedTable.items}
                            setTableItems={setTableItems}
                            allItems={allItems}
                            margin="20px 0 0 0"
                            temporary
                        />
                        <div className={styles.actionContainer}>
                            <div className={styles.inputWrapper}>
                                <InputField
                                    placeholder="Number of items to randomize"
                                    type="number"
                                    onChange={(e) =>
                                        (itemNumber.current = e.target.value)
                                    }
                                    small
                                />
                            </div>

                            <div className={styles.buttonWrapper}>
                                <Button
                                    title="ROLL!"
                                    type="success"
                                    onClick={randomizeItems}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.divider} />
            <div className={styles.slimContainer}>
                {!!randomItems.length && (
                    <div className={styles.bottomContainer}>
                        <RollTable
                            title="Treasure chest"
                            _id="Treasure chest"
                            tableItems={randomItems}
                            setTableItems={setRandomItems}
                            allItems={allItems}
                            margin="20px 0 0 0"
                            temporary
                            hideAdminDesc
                        />
                        <div className={styles.actionContainer}>
                            <div className={styles.buttonWrapper}>
                                <Button
                                    title="Show chest"
                                    type="success"
                                    onClick={showChest}
                                />
                            </div>
                            <div className={styles.buttonWrapper}>
                                <Button
                                    title="Delete chest"
                                    type="error"
                                    onClick={deleteChest}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
