import Pagination from "@mui/material/Pagination/Pagination";
import React from "react";
import {Button} from "@mui/material";
import './pagination.css';


class PaginationImageProps {
    pageCount: number;
    pageChange: (value: number) => void;
    page: number;
    sortAscending: () => void;
    sortDescending: () => void;
}

export const PaginationImage: React.FC<PaginationImageProps> = ({pageCount, pageChange, page, sortAscending, sortDescending}) => {
    const onPageChange = (event: React.ChangeEvent<unknown>, value:number) => pageChange(value);
    return (
        <div>
            <Pagination color="primary" count={pageCount} onChange={onPageChange} page={page} className={"pagination"}/>
            <div className={"button-container"}>
            <Button variant="contained" color="primary" onClick={sortAscending} className={"button"}>По возрастнанию</Button>
            <Button variant="contained" color="primary" onClick={sortDescending}>По убыванию</Button>
            </div>
        </div>
    );

};