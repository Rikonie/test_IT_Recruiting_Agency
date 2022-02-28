import axios from "axios";
import {Image} from "./image";

export class ImageServices {

    public static GetImage(): Promise<Image[]>{
        return axios.get('http://jsonplaceholder.typicode.com/photos').then(r=>{
            return r.data.map((i:any)=>{
                return new Image(
                    i?.albumId,
                    i?.id,
                    i?.title,
                    i?.url,
                    i?.thumbnailUrl
                )
            })
        })
    }
}