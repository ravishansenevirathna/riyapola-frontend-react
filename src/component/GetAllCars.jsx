import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import instance from '../service/ServiceOrder';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogBox from './DialogBox/DialogBox';


export default function GetAllCars() {
    const [openAlert, setOpenAlert] = useState(false)
    const [selectedCar, setSelectedCar] = useState({});

    const [handleOpen, sethandleOpen]= useState(true)

    const handleOpenUpAlert = (car) => {
        setSelectedCar(car);
         setOpenAlert(true)
    }



    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


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
                            <Button variant="contained" color="success" onClick={()=>{handleOpenUpAlert(car)}} >Update</Button>

                            <Button variant="outlined" color="error" onClick={deleteCar}>Delete</Button>
                        </CardActions>
                    </Card>
                </div>

            ))}

            {openAlert && 
            <DialogBox
            handleClose={() => {setOpenAlert(false)} }
            open={openAlert}
            car={selectedCar}
            />
            }
        
        
            
            
        </div>
    );
}