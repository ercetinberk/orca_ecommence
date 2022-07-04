import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
//#region STYLES
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  //border: '0.5px solid #000',
  boxShadow: 24,
  p: 5,
};
//#endregion

const OrcaModal = (props) => {
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

export default OrcaModal;
