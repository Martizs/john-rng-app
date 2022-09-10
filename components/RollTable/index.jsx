import axios from 'axios';
import { Button } from 'components/Button';
import { ItemList } from 'components/ItemList';
import { SearchDropdown } from 'components/SearchDropdown';
import { showError } from 'lib/ui/utils';
import { useState } from 'react';
import styles from './RollTable.module.css';

export const RollTable = ({ title, _id, initialTableItems, allItems }) => {
    const [createItem, setCreateItem] = useState(false);

    const [tableItems, setTableItems] = useState(initialTableItems || []);

    const onAddItem = (tableId, item) => {
        axios
            .post('/api/admin/rollTables/addItem', {
                tableId,
                itemId: item.value,
            })
            .then(() => {
                const newTableItems = [...tableItems];

                newTableItems.unshift(item);

                setTableItems(newTableItems);
            })
            .catch(showError);
    };

    return (
        <div className={styles.rollTableContainer}>
            <div className={styles.rollTableTitle}>{title}</div>

            <div className={styles.createAddContainer}>
                <div className={styles.addCreateButtonContainer}>
                    <Button
                        title="Create & Add item"
                        onClick={() => setCreateItem(true)}
                        type="success"
                    />
                </div>
                <div className={styles.addItemContainer}>
                    <SearchDropdown
                        options={allItems}
                        placeholder="Add item"
                        onChange={(option) => onAddItem(_id, option)}
                        value={null}
                    />
                </div>
            </div>

            <ItemList
                createItem={createItem}
                // onItemSave={() => loadItems({})}
                // resetCreate={() => setCreateItem(false)}
                items={tableItems}
                showPagination={false}
                onSearch={(event) => console.log('search', event.target.value)}
                onItemDelete={(id) => console.log('delete id', id)}
            />
        </div>
    );
};