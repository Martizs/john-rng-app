import styles from './InputField.module.css';

export const InputField = ({ small, ...props }) => (
    <input
        className={`${styles.container} ${small ? styles.smallContainer : ''}`}
        {...props}
    />
);
