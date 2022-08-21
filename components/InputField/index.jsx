import styles from './InputField.module.css';

export const InputField = (props) => (
    <input className={styles.container} {...props} />
);
