import * as React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import { useState } from "react";
import Swal from 'sweetalert2'
import instance from "../service/ServiceOrder.jsx";
import Stack from '@mui/material/Stack';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function Adminaction() {

    const [car_brand, setBrand] = useState("");
    const [car_model, setModel] = useState("");
    const [car_year, setYear] = useState("");
    const [car_engineCap, setEngineCap] = useState("");
    const [car_fuel, setFuel] = useState("");
    const [car_image, setImage] = useState("");


    const save = () => {
        const data = new FormData();

        data.append('brand', car_brand)
        data.append('model', car_model)
        data.append('year', car_year)
        data.append('engineCap', car_engineCap)
        data.append('fuelType', car_fuel)
        data.append('imageName', car_image)

        instance.post("/addnewcar", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    title: 'Saved',
                    text: "Your work has been saved!",
                    icon: "success",
                })
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const clear = () => {
        Swal.fire({
            title:'Are You sure?',
            text:"Your data will be lost!",
            icon:"warning",
        })
    }




    const [img, setImg] = useState();
    const changeImage = (val) => {
        console.log(val.target.files[0])
        setImg(URL.createObjectURL(val.target.files[0]))
        setImage(val.target.files[0])
    }


    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '60ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={(val) => setBrand(val.target.value)} id="outlined-basic" label="Enter Car Brand" variant="outlined" />
                <TextField onChange={(val) => setModel(val.target.value)} id="outlined-basic" label="Enter Car Model" variant="outlined" />
                <TextField onChange={(val) => setYear(val.target.value)} id="outlined-basic" label="Enter Car Year" variant="outlined" />
                <TextField onChange={(val) => setEngineCap(val.target.value)} id="outlined-basic" label="Enter Car Engine Capacity" variant="outlined" />
                <TextField onChange={(val) => setFuel(val.target.value)} id="outlined-basic" label="Enter Car Fuel Type" variant="outlined" />



            </Box>
            <div>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    onChange={changeImage}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload Image
                    <VisuallyHiddenInput type="file" />
                </Button>

                <img src={img} width={"40%"} height={"60%"} alt="" />



            </div>

            <br />
          
            <Stack direction="row" spacing={120}>
            <Button onClick={save} color="success" variant="contained">Save</Button>
            <Button onClick={clear} variant="outlined" color="error">Clear</Button>
            </Stack>



        </div>
    )
}
