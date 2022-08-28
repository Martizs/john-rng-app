import axios from 'axios';
import { Button } from 'components/Button';
import { ItemList } from 'components/ItemList';
import { ItemModal } from 'components/ItemModal';
import { showError } from 'lib/ui/utils';
import { useEffect, useRef, useState } from 'react';
import styles from './AllItems.module.css';

export const AllItems = () => {
    const [items, setItems] = useState([]);
    const [showItem, setShowItem] = useState(null);
    const currItem = useRef({});

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {
        axios
            .get('/api/admin/items')
            .then((resp) => setItems(resp.data))
            .catch(showError);
    };

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

    const handleCLose = () => {
        currItem.current = {};
        setShowItem(null);
    };

    const onSave = () => {
        const method = currItem.current._id ? 'put' : 'post';

        axios[method]('/api/admin/items', currItem.current)
            .then(() => {
                handleCLose();
                loadItems();
            })
            .catch(showError);
    };

    const onDelete = (_id) => {
        axios
            .delete(`/api/admin/items/${_id}`)
            .then(() => {
                loadItems();
            })
            .catch(showError);
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <Button
                    title="Add item"
                    onClick={() => handleShowItem({})}
                    type="success"
                />
            </div>
            <div className={styles.listContainer}>
                <ItemList
                    items={items}
                    onSearch={(e) => console.log('search', e.target.value)}
                    onItemClick={handleShowItem}
                    onItemDelete={onDelete}
                />
            </div>
            <ItemModal
                isOpen={!!showItem}
                onClose={handleCLose}
                item={showItem}
                onChange={onItemChange}
                onSave={onSave}
            />
        </div>
    );
};
