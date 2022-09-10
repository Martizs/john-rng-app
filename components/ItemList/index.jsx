import { InputField } from 'components/InputField';
import { ListItem } from './components/ListItem';
import styles from './ItemList.module.css';
import ReactPaginate from 'react-paginate';
import { LoadingIcon } from 'components/Icons/LoadingIcon';

export const ItemList = ({
    items,
    pageCount,
    showPagination,
    page,
    onPageChange,
    onSearch,
    onItemClick,
    onItemDelete,
    loading,
}) => (
    <div className={styles.container}>
        <div className={styles.mainContainer}>
            <InputField placeholder="Search" onChange={onSearch} />
            <div className={styles.loadingListContainer}>
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
                                        onClick={() => onItemClick(item)}
                                        onDelete={() => onItemDelete(item._id)}
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
    </div>
);
