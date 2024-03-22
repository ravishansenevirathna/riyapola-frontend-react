import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import instance from '../../service/ServiceOrder';
import Swal from 'sweetalert2'


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
    const [image, setImage] = useState(null);


    const saveUpdate = () => {

        const data = new FormData();
        data.append('carId',carId)
        data.append('brand', carBrand)
        data.append('model', carModel)
        data.append('year', carYear)
        data.append('engineCap', carEngineCap)
        data.append('fuelType', carFuel)
        data.append('imageName', img)

        instance.post("/updateCar/1", data, {
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
            >
              Upload image
              <VisuallyHiddenInput type="file" />
            </Button>
            
            <img src={img} width={"40%"} height={"60%"} alt="" />
            
          </div>
                    <Button color="success" variant="contained" onClick={saveUpdate}>Save</Button>
                    
                    <Button variant="outlined" color="error" onClick={handleClear}>Clear</Button>


                </DialogContent>

            </StyledDialog>
        </React.Fragment>

    )
}