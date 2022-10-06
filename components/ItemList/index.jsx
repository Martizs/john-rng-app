import { ListItem } from './components/ListItem';
import styles from './ItemList.module.css';
import ReactPaginate from 'react-paginate';
import { LoadingIcon } from 'components/Icons/LoadingIcon';
import { ItemModal } from 'components/ItemModal';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { showError } from 'lib/ui/utils';
import { ConfirmDeleteModal } from 'components/ConfirmDeleteModal';
import { v1 as uuidv1 } from 'uuid';

export const ItemList = ({
    items,
    pageCount,
    showPagination,
    page,
    onPageChange,
    onItemDelete,
    loading,
    listHeight,
    createItem,
    onItemSave,
    resetCreate,
    confirmDelete,
    temporary,
}) => {
    const [showItem, setShowItem] = useState(null);
    const [showItemDelete, setShowItemDelete] = useState(null);
    const currItem = useRef({});

    useEffect(() => {
        if (createItem) {
            handleShowItem({});
        }
    }, [createItem]);

    const onItemChange = (valueObj) => {
        currItem.current = {
            ...currItem.current,
            ...valueObj,
        };
    };

    const handleShowItem = (item) => {
        currItem.current = item;
        setShowItem(item);
    };

    const onSave = async () => {
        const method = currItem.current._id ? 'put' : 'post';
        const type = currItem.current._id ? 'edit' : 'create';

        try {
            let data;

            if (!temporary) {
                const resp = await axios[method](
                    '/api/admin/items',
                    currItem.current
                );
                data = resp.data;
            } else {
                data = {
                    _id: uuidv1(),
                    ...currItem.current,
                };
            }

            handleCLose();
            onItemSave(data, type);
        } catch (error) {
            showError(error);
        }
    };

    const handleCLose = () => {
        currItem.current = {};
        if (createItem) {
            resetCreate();
        }
        setShowItem(null);
    };

    const handleOnItemDelete = (itemId) => {
        setShowItemDelete(null);
        onItemDelete(itemId);
    };

    const handleShowItemDelete = (item) => {
        if (confirmDelete) {
            setShowItemDelete(item);
        } else {
            handleOnItemDelete(item?._id);
        }
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.mainContainer}
                style={{ height: listHeight }}
            >
                {loading ? (
                    <div className={styles.loadingIconContainer}>
                        <LoadingIcon width={200} height={200} />
                    </div>
                ) : (
                    <div className={styles.listContainer}>
                        {items.length ? (
                            <>
                                {items.map((item) => (
                                    <ListItem
                                        key={item._id}
                                        title={item.title}
                                        tooltip={item.description}
                                        onClick={() => handleShowItem(item)}
                                        onDelete={() =>
                                            handleShowItemDelete(item)
                                        }
                                    />
                                ))}
                            </>
                        ) : (
                            <div className={styles.noItemsLabel}>
                                No items found
                            </div>
                        )}
                    </div>
                )}
            </div>
            {showPagination && (
                <ReactPaginate
                    forcePage={page}
                    containerClassName={styles.paginationContainer}
                    breakLabel="..."
                    nextLabel=">"
                    breakLinkClassName={styles.paginationItem}
                    pageLinkClassName={styles.paginationItem}
                    previousLinkClassName={styles.paginationItem}
                    nextLinkClassName={styles.paginationItem}
                    activeLinkClassName={styles.activePaginationItem}
                    onPageChange={onPageChange}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            )}
            <ItemModal
                isOpen={!!showItem}
                onClose={handleCLose}
                item={showItem}
                onChange={onItemChange}
                onSave={onSave}
            />
            <ConfirmDeleteModal
                isOpen={!!showItemDelete}
                onRequestClose={() => setShowItemDelete(null)}
                title={`Are you sure you want to delete item - ${showItemDelete?.title} ?`}
                onConfirm={() => handleOnItemDelete(showItemDelete?._id)}
            />
        </div>
    );
};
