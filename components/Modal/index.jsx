import ReactModal from 'react-modal';

ReactModal.setAppElement('#__next');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        backgroundColor: '#343434',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const Modal = ({ children, height, width, ...props }) => (
    <ReactModal
        {...props}
        style={{
            ...customStyles,
            content: {
                ...customStyles.content,
                height: height ?? 'unset',
                width: width ?? 'unset',
            },
        }}
    >
        {children}
    </ReactModal>
);
