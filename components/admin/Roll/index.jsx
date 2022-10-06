import axios from 'axios';
import { SearchDropdown } from 'components/SearchDropdown';
import { RollTable } from 'components/RollTable';
import { showError } from 'lib/ui/utils';
import { useEffect, useState } from 'react';
import styles from './Roll.module.css';

export const Roll = () => {
    const [rollTables, setRollTables] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

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
        } catch (error) {
            showError(error);
        }
    };

    useEffect(() => {
        loadInitalData();
    }, []);

    return (
        <div className={styles.container}>
            <SearchDropdown
                options={rollTables}
                placeholder="Select table"
                onChange={setSelectedTable}
                value={null}
            />
            {selectedTable && (
                <RollTable
                    title={selectedTable.title}
                    _id={selectedTable._id}
                    initialTableItems={selectedTable.items}
                    allItems={allItems}
                    margin="20px 0 0 0"
                    temporary
                />
            )}
        </div>
    );
};
