import React, {useEffect, useState} from 'react';
import {Image} from "./image";
import {ImageServices} from "./image-services";
import Pagination from "@mui/material/Pagination";

function App() {

    let [arrImage, setArrImage] = useState<Image[]>([]);

    const setImage = async () => {
        let a = await ImageServices.GetImage();
        setArrImage(a)
    };

    useEffect(() => {
        setImage()
    }, []);

    const deleteImage = (i: Image, arr: Image[], key:number) => {
        let el = arr.find((x) => x.id === i.id);
        let index = el ? arr.indexOf(el) : -1;
        arr.splice(index, 1);
        let div = document.getElementById("div"+key);
        div?.remove()
    };

    const paginate =(event: any)=> {
        let a = arrImage.slice((event.target.value - 1) * 10, event.target.value * 10);
        setArrImage(a)
    };


    return (
        <div>
            <Pagination count={arrImage.length/10} onChange={paginate}/>
            {arrImage ? arrImage.map((i: Image, key: number) => {
                return (
                    <div key={key} id={"div"+key}>
                        <div>{i.title}</div>
                        <img id={i.id.toString()} src={i.thumbnailUrl} alt={i.title} onClick={() => {
                            let a: HTMLImageElement = document.getElementById(i.id.toString()) as HTMLImageElement;
                            if (a.src == i.thumbnailUrl) {
                                a.src = i.url
                            } else {
                                a.src = i.thumbnailUrl
                            }
                        }}/>
                        <button onClick={() => deleteImage(i, arrImage, key)}>Удалить</button>
                    </div>
                )
            }) : ''}
        </div>
    );
}

export default App;
