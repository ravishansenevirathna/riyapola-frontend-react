import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import { useState } from "react";
import Swal from 'sweetalert2'
import instance from "../service/ServiceOrder.jsx";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';



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

        instance.post("/car/addNewCar", data, {
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


    // const clear = () => {
    //     Swal.fire({
    //         title: 'Are You sure?',
    //         text: 'Your data will be lost!',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, clear it!',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             setBrand("");
    //             setModel("");
    //             setYear('');
    //             setEngineCap("");
    //             setFuel("");
    //             setImage(null);
    //             setImg(null);
    //         }
    //     });
    // };

    const clear = () => {
        Swal.fire({
            title: 'Are You sure?',
            text: 'Your data will be lost!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setBrand("");
                setModel("");
                setYear("");
                setEngineCap("");
                setFuel("");
                setImage(null);
                setImg(null);


                const form = document.querySelector('form');
                if (form) {
                    form.reset();
                }
            }
        });
    };



    const [img, setImg] = useState();
    const changeImage = (val) => {
        console.log(val.target.files[0])
        setImg(URL.createObjectURL(val.target.files[0]))
        setImage(val.target.files[0])
    }


    return (
        <div>
            <Box sx={{ boxShadow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 15px', borderBottom: '1px solid #ddd',   background: `linear-gradient(to right, #d3d3e3, #c0c0d9)`,  }}>
                <DirectionsCarIcon sx={{ fontSize: 40, marginRight: 10, color:"primary.main" }}  />
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
                    Add New Car
                </Typography>
                <DirectionsCarIcon sx={{ fontSize: 40, marginLeft: 10, color:"primary.main" }}/>
               
            </Box>
            <br />
            <Box
                component="form"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                    // Other spacing adjustments as needed
                }}
                noValidate
                autoComplete="off"
            >
                <Grid item xs={6}>
                    <TextField
                        label="Enter Car Brand"
                        variant="outlined"
                        fullWidth
                        onChange={(val) => setBrand(val.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Enter Car Model"
                        variant="outlined"
                        fullWidth
                        onChange={(val) => setModel(val.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Enter Car Year"
                        variant="outlined"
                        fullWidth
                        onChange={(val) => setYear(val.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Enter Car Engine Capacity"
                        variant="outlined"
                        fullWidth
                        onChange={(val) => setEngineCap(val.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Enter Car Fuel Type"
                        variant="outlined"
                        fullWidth
                        onChange={(val) => setFuel(val.target.value)}
                    />
                </Grid>

            </Box>
            <br />


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
