import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
//#region STYLES
const modalStyle = {
  position: 'absolute',
  bgcolor: 'background.paper',
  top: '40%',
  left: '40%',
  transform: 'translate(-40%, -40%)',
  boxShadow: 24,
  width:'90%',
};
//#endregion

const OrcaBottomModal = (props) => {
  return (

    <Modal
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
            {props.children}
        </Box>
      </Modal>
  );
};

export default OrcaBottomModal;
