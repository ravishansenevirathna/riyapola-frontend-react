import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import instance from '../service/ServiceOrder';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function GetAllCars() {

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        getAllCars()
    }, []);


    const [data, setData] = useState([]);

    const getAllCars = () => {
        instance({
            method: 'get',
            url: '/car/getAllCars',
        })
            .then((response) => {
                const array = [];
                response.data.forEach((val) => {
                    array.push({
                        carId: val.id,
                        carBrand: val.brand,
                        carModel: val.model,
                        carYear: val.year,
                        carEngineCap: val.engineCap,
                        carFuelType: val.fuelType,
                        carImageName: val.imageName,
                    });
                });
                setData(array);
            })
            .catch((error) => {
                console.error('Error fetching cars:', error);
            });
    };

    const updateCar = () => {
        setOpen(true);

    }


    const deleteCar = () => {
        console.log('====================================');

    }



    return (
        <div>

            {data.map((car) => (

                <div key={car.carId}> {/* Use carId as a unique key */}
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 180 }}
                            image={`http://localhost:8080/${car.carImageName}`}

                        />
                        <CardContent>

                            <Typography gutterBottom variant="h5" component="div">
                                {car.carBrand} {car.carModel}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Year : {car.carYear} | Engine : {car.carEngineCap} | Fuel Type : {car.carFuelType}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="success" onClick={() => updateCar(car)} >Update</Button>

                    {/* this is Dialog Box */}

                            <Dialog 
                                fullScreen={fullScreen}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"
                            >
                                <DialogTitle id="responsive-dialog-title">
                                    {"Use Google's location service?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        <textarea>{car.carModel}</textarea>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                        Disagree
                                    </Button>
                                    <Button onClick={handleClose} autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            {/* End of the dialog box */}

                            <Button variant="outlined" color="error" onClick={deleteCar}>Delete</Button>
                        </CardActions>
                    </Card>
                </div>

            ))}
        </div>
    );
}