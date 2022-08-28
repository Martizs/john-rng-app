import styles from './TextArea.module.css';
import TextareaAutosize from 'react-textarea-autosize';

export const TextArea = (props) => (
    <TextareaAutosize className={styles.container} {...props} />
);
