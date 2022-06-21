import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsModalOpen } from '../../store/reducers/authReducer';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function MyModal() {
    const isModalOpen = useAppSelector((state) => state.auth.isModalOpen);
    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(setIsModalOpen(false));
    }
    useEffect(() => {

    }, [isModalOpen])


    return (
        <div>
            <Modal
                open={!!isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        You are not logged in,Your being redirected to login page
                    </Typography>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}
