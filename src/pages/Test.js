import React, {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";

export default function Test() {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setList(data.products))
            .then(console.log);
    }, []);

    return (
        <Box>

            {list.length > 0 ? (
                list.map((item) => (
                    <Product key={item.id} item={item}/>
                ))
            ) : (
                <Typography>Ждите. Еще немного</Typography>
            )}
        </Box>
    );
}

function Product({item}) {
    return (
        <Box display="flex" justifyContent="space-between">

            <Typography>{item.title}</Typography>
            <Typography>{item.price} $</Typography>
        </Box>
    );
}
