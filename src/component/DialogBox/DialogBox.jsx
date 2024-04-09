import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import instance from '../../service/ServiceOrder';
import Swal from 'sweetalert2'
import { Box } from '@mui/material';


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

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        color: theme.palette.primary.main, // Customize label color
    },
    '& .MuiInputBase-root': {
        borderColor: theme.palette.primary.main, // Customize input border color
        borderRadius: 4, // Add rounded corners to input
    },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        border: `2px solid ${theme.palette.primary.main}`, // Customize border color (optional)
        borderRadius: 10, // Add rounded corners (optional)
        padding: theme.spacing(2), // Add padding for content
        minWidth: '500px', // Set minimum width for a slightly larger dialog
    },
    '& .MuiDialogContent-root': {
        display: 'flex',
        flexDirection: 'column', // Arrange content vertically
        alignItems: 'center', // Center content horizontally
    },
}));




export default function DialogBox({ open, handleClose, car }) {

    const [carId, setCarId] = useState(car?.carId || '');
    const [carBrand, setBrand] = useState(car?.carBrand || '');
    const [carModel, setModel] = useState(car?.carModel || '');
    const [carYear, setYear] = useState(car?.carYear || '');
    const [carEngineCap, setEngineCap] = useState(car?.carEngineCap || '');
    const [carFuel, setFuel] = useState(car?.carFuelType || '');
    const [car_image, setImage] = useState("");
    const [car_image_id, setImageId] = useState(car?.carImageId || '')
    



    const saveUpdate = (car) => {

        instance.put(`car/updateCar/${car.carId}`, {

            brand: carBrand,
            model: carModel,
            year: carYear,
            engineCap: carEngineCap,
            fuelType: carFuel

        })

            .then(function (response) {
                console.log(response);
                console.log(response.data.carId);

                const data = new FormData();
                data.append('image_name', img)
                data.append('carId', car.carId)

                if (img) { // Check if there's an image selected
                    data.append('imageName', car_image); // Include image if available
                }


                const url = `carImage/updateCarImage/${car.carImageId}`;
                instance.put(url, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }

                })
                    .then(function (response) {
                        console.log("work")
                        console.log(response);

                        Swal.fire({
                            title: 'Saved',
                            text: "Your work has been saved!",
                            icon: "success",
                        })

                    })

                    .catch(function (error) {
                        console.log("there was no image included");
                        console.log(error);
                        Swal.fire({
                            title: 'warning',
                            text: "Car details has been saved without updating an Image!",
                            icon: "warning",
                        })
                    });
                })
                    .catch(function (error) {
                        console.log("image ekk dann");
                        console.log(error);
                        Swal.fire({
                            title: 'Error',
                            text: "Please upload an Image!",
                            icon: "error",
                        })
                    });

                    

                console.log('Car details:', {
                    carBrand,
                    carModel,
                    carYear,
                    carEngineCap,
                    carFuel,
                    img,
                });
                handleClose();
            };




        const handleClear = () => {
            setBrand('');
            setModel('');
            setYear('');
            setEngineCap('');
            setFuel('');
            setImage(null); // Clear image preview
        };


        const [img, setImg] = useState();
        const changeImage = (val) => {
            console.log(val.target.files[0])
            setImg(URL.createObjectURL(val.target.files[0]))
            setImage(val.target.files[0])
        }

        return (

            <React.Fragment>
                <StyledDialog open={open} onClose={handleClose}>
                    <DialogTitle onClose={handleClose}>
                        <Typography variant="h6">Manage Car Details</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <StyledTextField  // Use StyledTextField for consistent styling
                            autoFocus
                            margin="dense"
                            id="carBrand"
                            label="Car Brand"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={carBrand}
                            onChange={(event) => setBrand(event.target.value)}
                        />
                        <StyledTextField  // Use StyledTextField for consistent styling
                            margin="dense"
                            id="carModel"
                            label="Car Model"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={carModel}
                            onChange={(event) => setModel(event.target.value)}
                        />
                        <StyledTextField  // Use StyledTextField for consistent styling
                            margin="dense"
                            id="carYear"
                            label="Car Year"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={carYear}
                            onChange={(event) => setYear(event.target.value)}
                        />

                        <StyledTextField  // Use StyledTextField for consistent styling
                            margin="dense"
                            id="carEngineCap"
                            label="Car EngineCap "
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={carEngineCap}
                            onChange={(event) => setEngineCap(event.target.value)}
                        />

                        <StyledTextField  // Use StyledTextField for consistent styling
                            margin="dense"
                            id="carFuel"
                            label="Car Fuel "
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={carFuel}
                            onChange={(event) => setFuel(event.target.value)}
                        />

                        <div>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                onChange={changeImage}
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                Upload image
                                <VisuallyHiddenInput type="file" />
                            </Button>

                            <img src={img} width={"40%"} height={"60%"} alt="" />

                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button color="success" variant="contained" onClick={() => saveUpdate(car)} sx={{ marginRight: 30 }}>Save</Button>
                            <Button variant="outlined" color="error" onClick={handleClear}>Clear</Button>
                        </Box>


                    </DialogContent>

                </StyledDialog>
            </React.Fragment>

        )
    }