import React from "react";
import {Image} from "./image";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import './imageListItem.css';

class ImageListItemProps {
    onClick: (i: Image) => void;
    deleteImage: (i: Image) => void;
    image: Image;
}

export const ImageListItem: React.FC<ImageListItemProps> = ({image, onClick, deleteImage}) => {
    const onDeleteImage = () => deleteImage(image);
    const onBtnClick = () => onClick(image);
    return (
        <Grid item xs={2.4}>
            <Card variant="outlined">
                <CardContent>
                    <img id={image.id.toString()} src={image.thumbnailUrl} alt={image.title} onClick={onBtnClick}/>
                    <div className={"text"}>
                        <p>Название: {image.title}</p>
                        <p>ID Альбома: {image.albumId}</p>
                    </div>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="contained" color="primary"
                            onClick={onDeleteImage}>Удалить</Button>
                </CardActions>
            </Card>
        </Grid>
    )
};