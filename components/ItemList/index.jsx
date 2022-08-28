import { InputField } from 'components/InputField';
import { ListItem } from './components/ListItem';
import styles from './ItemList.module.css';

export const ItemList = ({ items, onSearch, onItemClick, onItemDelete }) => (
    <div className={styles.container}>
        <InputField placeholder="Search" onChange={onSearch} />
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
                <div className={styles.noItemsLabel}>No items found</div>
            )}
        </div>
    </div>
);
