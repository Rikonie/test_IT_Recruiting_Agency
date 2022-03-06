import React, {useEffect, useState} from 'react';
import {Image} from "./image";
import {ImageServices} from "./image-services";
import {PaginationImage} from "./pagination";
import {ImageListItem} from "./imageListItem";
import {ImageModal} from "./imageModal";
import Grid from "@mui/material/Grid";
import './App.css';

function App() {

    let [arrImage, setArrImage] = useState<Image[]>([]);
    let [page, setPage] = useState<number>(1);
    let [arrPagination, setArrPagination] = useState<Image[]>(arrImage?.slice(1, 10));
    let [modalItem, setModalItem] = useState<Image | null>(null);

    const setImage = async () => {
        let a = await ImageServices.GetImage();
        setArrImage(a);
        let pagArr = a.slice(0, 10);
        setArrPagination([...pagArr])
    };


    useEffect(() => {
        setImage();
    }, []);


    const deleteImage = (i: Image) => {
        let el = arrPagination.find((x) => x.id === i.id);
        let index = el ? arrPagination.indexOf(el) : -1;
        let elArrImage = arrImage.find((x) => x.id === i.id);
        let indexArrImage = elArrImage ? arrImage.indexOf(elArrImage) : -1;
        arrPagination.splice(index, 1);
        arrImage.splice(indexArrImage, 1);
        setArrPagination([...arrPagination]);
        setArrImage([...arrImage])
    };

    const pageChange = (value: number) => {
        let newArr = arrImage?.slice((value - 1) * 10, value * 10);
        setPage(value);
        setArrPagination(newArr)
    };

    function compareNumbersAscending(a: Image, b: Image) {
        return a.albumId - b.albumId;
    }

    function compareNumbersDescending(a: Image, b: Image) {
        return b.albumId - a.albumId;
    }

    const sortDescending = () => {
        arrImage.sort(compareNumbersDescending);
        setArrImage([...arrImage]);
        let pagArr = arrImage.slice((page - 1) * 10, page * 10);
        setArrPagination([...pagArr])
    };

    const sortAscending = () => {
        arrImage.sort(compareNumbersAscending);
        setArrImage([...arrImage]);
        let pagArr = arrImage.slice((page - 1) * 10, page * 10);
        setArrPagination([...pagArr])
    };

    return (
        <>
            <div className={"center"}>
                <PaginationImage pageCount={Math.ceil(arrImage.length / 10)} pageChange={pageChange} page={page}
                                 sortAscending={sortAscending} sortDescending={sortDescending}/>
                <Grid container spacing={5}>
                    {arrPagination ? arrPagination.map((i: Image, key: number) => {
                    return (
                        <ImageListItem image={i} onClick={setModalItem}
                                       deleteImage={deleteImage} key={key}/>
                    )
                }) : ''}
                </Grid>
            </div>
            <ImageModal onClose={() => setModalItem(null)} image={modalItem}/>
        </>
    );
}

export default App;
