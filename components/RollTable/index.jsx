import axios from 'axios';
import { Button } from 'components/Button';
import { DeleteIconButton } from 'components/DeleteIconButton';
import { EditIconButton } from 'components/EditIconButton';
import { ItemList } from 'components/ItemList';
import { SearchDropdown } from 'components/SearchDropdown';
import { showError } from 'lib/ui/utils';
import { useMemo, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './RollTable.module.css';

export const RollTable = ({
    title,
    _id,
    initialTableItems,
    allItems,
    reloadItems,
    onTableDelete,
    onTableEdit,
}) => {
    const [createItem, setCreateItem] = useState(false);

    const [tableItems, setTableItems] = useState(initialTableItems || []);

    const onAddItem = (item) => {
        axios
            .post('/api/admin/rollTables/items', {
                tableId: _id,
                itemId: item._id,
            })
            .then(() => {
                const newTableItems = [...tableItems];

                newTableItems.unshift(item);

                setTableItems(newTableItems);
            })
            .catch(showError);
    };

    const onRemoveItem = (itemId) => {
        axios
            .delete('/api/admin/rollTables/items', {
                data: { tableId: _id, itemId },
            })
            .then(() =>
                setTableItems(
                    tableItems.filter((tableItem) => tableItem._id !== itemId)
                )
            )
            .catch(showError);
    };

    const onItemSave = (item) => {
        onAddItem(_id, item);
        reloadItems();
    };

    const options = useMemo(() => {
        const adjustedItems = [];

        allItems.forEach((item) => {
            if (!tableItems.find((tableItem) => tableItem._id === item._id)) {
                adjustedItems.push(item);
            }
        });

        return adjustedItems;
    }, [allItems, tableItems]);

    return (
        <div className={styles.rollTableContainer}>
            <div className={styles.rollTableHeader}>
                <div className={styles.iconButtonContainer} />
                <div className={styles.rollTableTitle}>{title}</div>
                <div className={styles.iconButtonContainer}>
                    <EditIconButton onClick={onTableEdit} />
                    <DeleteIconButton width={30} onClick={onTableDelete} />
                </div>
            </div>

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
                        options={options}
                        placeholder="Add item"
                        onChange={onAddItem}
                        formatOptionLabel={(option) => (
                            <div data-tip={option.description}>
                                {option.label}
                                <ReactTooltip delayShow={500} />
                            </div>
                        )}
                        value={null}
                    />
                </div>
            </div>

            <ItemList
                createItem={createItem}
                onItemSave={onItemSave}
                resetCreate={() => setCreateItem(false)}
                items={tableItems}
                showPagination={false}
                onItemDelete={onRemoveItem}
            />
        </div>
    );
};
