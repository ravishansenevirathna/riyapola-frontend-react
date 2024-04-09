import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Import Grid for layout
import instance from '../service/ServiceOrder';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogBox from './DialogBox/DialogBox';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2'


export default function GetAllCars() {
  const [openAlert, setOpenAlert] = useState(false)
  const [selectedCar, setSelectedCar] = useState({});

  const [handleOpen, sethandleOpen] = useState(true)

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
        console.log(response.data)
        const array = [];
        response.data.forEach((val) => {
           
          array.push({
            carId: val.carId,
            carBrand: val.brand,
            carModel: val.model,
            carYear: val.year,
            carEngineCap: val.engineCap,
            carFuelType: val.fuelType,
            carImageName: val.images[0].imageName,
            carImageId:val.images[0].imageId
          });
        });
        setData(array);
        console.log("array is ", array);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  };




  const deleteCar = (carId) => {
    Swal.fire({
      title: 'Are You sure?',
      text: 'Your data will be lost!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        instance({
          method: 'delete',
          url: '/car/deleteCar/' + carId,
        })
          .then(function (response) {
            console.log("fgfgfgfgfgfgf");
            console.log(response);
            getAllCars()


          })
          .catch(function (error) {
            console.log(error);
          });

      }
    });
  };


  return (
    <div>
      <Box sx={{ boxShadow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 15px', borderBottom: '1px solid #ddd', background: `linear-gradient(to right, #d3d3e3, #c0c0d9)`, }}>
        <DirectionsCarIcon sx={{ fontSize: 40, marginRight: 10, color: "primary.main" }} />
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
          Our Cars
        </Typography>
        <DirectionsCarIcon sx={{ fontSize: 40, marginLeft: 10, color: "primary.main" }} />

      </Box>
      <br />

      <Grid container spacing={2} alignItems="flex-start"> {/* Use Grid for layout */}
        {data.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.carId}> {/* Responsive grid distribution */}
            <Card sx={{ maxWidth: 370, minWidth: 370 }}> {/* Set minimum width for smaller screens */}
              <CardMedia
                sx={{ height: 220, display: 'block' }}
                image={`http://localhost:8080/${car.carImageName}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {car.carBrand} {car.carModel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {car.carYear} | Engine: {car.carEngineCap} | Fuel Type: {car.carFuelType}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" onClick={() => handleOpenUpAlert(car)}>
                  Update
                </Button>
                <Button variant="outlined" color="error" onClick={() => deleteCar(car.carId)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {openAlert && (
        <DialogBox
          refresh={()=> getAllCars()}
          handleClose={() => setOpenAlert(false)}
          open={openAlert}
          car={selectedCar}
        />
      )}
    </div>

  );
}