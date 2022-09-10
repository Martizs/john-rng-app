import axios from 'axios';
import queryString from 'query-string';
import { Button } from 'components/Button';
import { ItemList } from 'components/ItemList';
import { showError, showSuccess } from 'lib/ui/utils';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './AllItems.module.css';
import { InputField } from 'components/InputField';

const pageSize = 10;

export const AllItems = () => {
    const hiddenFileInput = useRef(null);

    const searchTerm = useRef();
    const [currPage, setCurrPage] = useState(0);
    const [loadingImport, setLoadingImport] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [createItem, setCreateItem] = useState(false);

    const [itemData, setItemData] = useState({
        data: [],
        total: 0,
    });

    useEffect(() => {
        loadItems({});

        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    const loadItems = ({ page = currPage, search = searchTerm.current }) => {
        setLoadingItems(true);

        const query = queryString.stringify({ page, search, pageSize });

        axios
            .get(`/api/admin/items?${query}`)
            .then((resp) => setItemData(resp.data))
            .catch(showError)
            .finally(() => {
                setLoadingItems(false);
            });
    };

    const onDelete = (_id) => {
        axios
            .delete(`/api/admin/items/${_id}`)
            .then(() => {
                loadItems({});
            })
            .catch(showError);
    };

    const onPageChange = ({ selected }) => {
        setCurrPage(selected);
        loadItems({ page: selected });
    };

    const onSearch = (e) => {
        const value = e.target.value;
        setCurrPage(0);
        searchTerm.current = value;
        loadItems({ page: 0, search: value });
    };

    const debouncedSearch = useMemo(() => debounce(onSearch, 500), []);

    const handleFileChange = (event) => {
        setLoadingImport(true);
        const formData = new FormData();

        formData.append('file', event.target.files[0]);

        axios
            .post('/api/admin/items/import', formData, {
                headers: { 'content-type': 'multipart/form-data' },
            })
            .then((resp) => {
                const data = resp.data;
                showSuccess(`Items inserted: ${data.docsInserted}`);

                data.insertErrors.forEach((insertError) => {
                    showError(
                        `Insert failures: ${insertError.message}, count: ${insertError.count}`
                    );
                });

                loadItems({});
            })
            .catch(showError)
            .finally(() => {
                setLoadingImport(false);
                event.target.value = null;
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <div className={styles.buttonWrapper}>
                    <Button
                        title="Add item"
                        onClick={() => setCreateItem(true)}
                        type="success"
                    />
                </div>
                <div>
                    <Button
                        title="Import csv"
                        loading={loadingImport}
                        onClick={() => {
                            hiddenFileInput.current.click();
                        }}
                    />
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className={styles.linkWrapper}>
                    <Button
                        href={`/api/admin/items/export?${queryString.stringify({
                            search: searchTerm.current,
                        })}`}
                        isLink
                        title="Export csv"
                    />
                </div>
            </div>

            <div className={styles.listContainer}>
                <div className={styles.searchInput}>
                    <InputField
                        placeholder="Search"
                        onChange={debouncedSearch}
                    />
                </div>

                <ItemList
                    listHeight="650px"
                    loading={loadingItems}
                    items={itemData.data}
                    pageCount={Math.ceil(itemData.total / pageSize)}
                    onPageChange={onPageChange}
                    showPagination={itemData.total > pageSize}
                    page={currPage}
                    onItemDelete={onDelete}
                    createItem={createItem}
                    onItemSave={() => loadItems({})}
                    resetCreate={() => setCreateItem(false)}
                />
            </div>
        </div>
    );
};
