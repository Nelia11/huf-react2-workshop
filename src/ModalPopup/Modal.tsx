import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button/Button';
import "./Modal.css"
import ModalContent from './ModalContent';
import Box from '@mui/material/Box';

interface ModalProps {
    open: boolean;
    onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ open, onClose }) => {
    if(!open) return null;

    return ReactDOM.createPortal (
        <div className="container">
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "1px dashed grey"
            }}>
                <ModalContent />
                <Button 
                    onClick={onClose}
                    variant="contained" 
                    color="error"
                >Close
                </Button>
            </Box>
        </div>, 
        document.getElementById("portal") as HTMLElement
    );
};

export default Modal;