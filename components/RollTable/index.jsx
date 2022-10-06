import axios from 'axios';
import { Button } from 'components/Button';
import { DeleteIconButton } from 'components/DeleteIconButton';
import { EditIconButton } from 'components/EditIconButton';
import { ItemList } from 'components/ItemList';
import { SearchDropdown } from 'components/SearchDropdown';
import { showError } from 'lib/ui/utils';
import { useEffect, useMemo, useState } from 'react';
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
    margin = '0.2rem',
    temporary,
}) => {
    const [createItem, setCreateItem] = useState(false);

    const [tableItems, setTableItems] = useState([]);

    const onAddItem = async (item) => {
        try {
            if (!temporary) {
                await axios.post('/api/admin/rollTables/items', {
                    tableId: _id,
                    itemId: item._id,
                });
            }

            const newTableItems = [...tableItems];
            newTableItems.unshift(item);
            setTableItems(newTableItems);
        } catch (error) {
            showError(error);
        }
    };

    const onRemoveItem = async (itemId) => {
        try {
            if (!temporary) {
                await axios.delete('/api/admin/rollTables/items', {
                    data: { tableId: _id, itemId },
                });
            }

            setTableItems(
                tableItems.filter((tableItem) => tableItem._id !== itemId)
            );
        } catch (error) {
            showError(error);
        }
    };

    const onItemSave = (item, type) => {
        if (type === 'create') {
            onAddItem(item);
        } else {
            const newTableItems = [...tableItems];
            const editedIndex = newTableItems.findIndex(
                (tableItem) => tableItem._id === item._id
            );
            newTableItems[editedIndex] = item;
            setTableItems(newTableItems);
        }

        reloadItems && reloadItems();
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

    useEffect(() => {
        setTableItems(initialTableItems);
    }, [initialTableItems]);

    return (
        <div className={styles.rollTableContainer} style={{ margin }}>
            <div className={styles.rollTableHeader}>
                {!temporary && <div className={styles.iconButtonContainer} />}
                <div className={styles.rollTableTitle}>{title}</div>
                {!temporary && (
                    <div className={styles.iconButtonContainer}>
                        <EditIconButton onClick={onTableEdit} />
                        <DeleteIconButton width={30} onClick={onTableDelete} />
                    </div>
                )}
            </div>

            <div className={styles.createAddContainer}>
                <div className={styles.addCreateButtonContainer}>
                    <Button
                        title={
                            temporary
                                ? 'Add temporary item'
                                : 'Create & Add item'
                        }
                        onClick={() => setCreateItem(true)}
                        type="success"
                    />
                </div>
                <div className={styles.addItemContainer}>
                    <SearchDropdown
                        options={options}
                        placeholder={
                            temporary ? 'Add temporary item' : 'Add item'
                        }
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
                temporary={temporary}
            />
        </div>
    );
};
