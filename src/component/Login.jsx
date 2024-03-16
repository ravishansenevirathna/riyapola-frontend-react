import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import instance from "../service/ServiceOrder.jsx";
import {useState} from "react";
import {useNavigate} from 'react-router-dom'



export default function Login(){

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password,setPassword]=useState("");

    const loginAction = () => {
        instance.post('/admin/login', {
            userName: userName,
            password: password
        })
            .then(function (response) {
                console.log(response.data.token);
                
                localStorage.setItem('stmToken',response.data.token);
                window.location.reload();
                // navigate('/orderDetails')
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return(
        <div>
            <Card sx={{ maxWidth: 345 , left:'0px', right:'0px', margin:' 12% auto', padding:'20px' ,display:'flex', flexDirection:'column', justifyContent:'center' , alignItems:"center" , boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>


                    <Typography gutterBottom variant="h5" component="div">
                        Admin Login
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '30ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField onChange={(val)=> setUserName(val.target.value)} id="outlined-basic" label="Enter Your User Name" variant="outlined" />
                            <br/><br/>
                            <TextField onChange={(val)=> setPassword(val.target.value)} id="outlined-basic" label="Enter Your Password" variant="outlined" />
                        </Box>
                    </Typography>


                    <Button sx={{borderRadius:"90px",width: '30ch', marginTop:'20px'}} variant="contained" color="secondary" onClick={()=>loginAction()}>Login</Button>

            </Card>
        </div>
    )
}