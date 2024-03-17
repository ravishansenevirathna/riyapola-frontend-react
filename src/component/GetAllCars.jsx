import React , {useEffect,useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import instance from '../service/ServiceOrder';
import { TextField } from '@mui/material';


export default function GetAllCars() {


    useEffect(() => {
        getAllCars()
    },[]);


    const  [data,setData] = useState([]);

const getAllCars=()=>{

    instance({
        method:'get',
        url:'/car/getAllCars',

    })
    .then(function (response){
        const array=[];
        console.log("responce",response.data);
            response.data.forEach(val=>{
                array.push({
                    carId:val.id,
                    carBrand:val.brand,
                    carModel:val.model,
                    carYear:val.year,
                    carEngineCap:val.engineCap,
                    carFuelType:val.fuelType,
                    carImageName:val.imageName
                });
                console.log(response)
            });
            setData(array);

        })
}



    return (
        <div>

            {
               
                <div>
                    <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={"http://localhost:8080"+ "carImageName"}
                    title="green iguana"
                />
                <CardContent>
                    <TextField>
                
                    </TextField>

                    

                    <Typography gutterBottom variant="h5" component="div">
                        car
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        your car data
                    </Typography>
                </CardContent>
                <CardActions>
                <Button variant="contained" color="success">Update</Button>
                <Button variant="outlined" color="error">Delete</Button>
                </CardActions>
            </Card>
                </div>
               
            }
        </div>
    )
}