import React from "react";
import {Image} from "./image";
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";

class ImageModalProps {
    onClose:()=>void;
    image:Image|null;
}

export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

export const ImageModal:React.FC<ImageModalProps> = ({onClose, image})=>{
    return (
        <Modal onClose={onClose} open={!!image} aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box sx={style}>
                <img src={image?.url} alt={image?.title} onClick={onClose}/>
            </Box>
        </Modal>
    )
};