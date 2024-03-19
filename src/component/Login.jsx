import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import instance from "../service/ServiceOrder.jsx";
import {useState} from "react";
import { InputAdornment ,IconButton, Hidden } from '@mui/material'; 
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../component/LoginPage/LoginPage.css'



export default function Login(){

   
    const [user, setUserName] = useState("");
    const [pw,setPassword]=useState("");
    const [showPassword, setShowPassword] = useState(true);

    const loginAction = () => {
        instance.post('/admin/login', {
            userName: user,
            password: pw
        })
            .then(function (response) {            
                localStorage.setItem('stmToken',response.data.token);
                console.log(localStorage.getItem("stmToken"))
                
                window.location.reload();
               
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return(
        <Box sx={{display: 'flex', height: '97vh', justifyContent: 'center', alignItems: 'center'}}>
            <div className='backgroundImg'></div>
            <Card sx={{ maxWidth: 345 , left:'0px', right:'0px' ,padding: 3,display:'flex', flexDirection:'column', justifyContent:'center' , alignItems:"center" , boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>


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
                            <TextField  onChange={(val)=> setUserName(val.target.value)} id="outlined-basic" label="Enter Your User Name" variant="outlined" />
                            <br/><br/>
                            {/* <TextField onChange={(val)=> setPassword(val.target.value)} id="outlined-basic" label="Enter Your Password" variant="outlined" /> */}

                            <TextField
                                onChange={(event) => setPassword(event.target.value)} // Use event.target.value
                                id="outlined-password-input"
                                label="Enter Your Password"
                                type={!showPassword ? 'text' : 'password'}
                                value={pw} // Add value for controlled component
                                InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                                ),
                                }}
                            />
                        </Box>
                    </Typography>


                    <Button sx={{borderRadius:"90px",width: '30ch', marginTop:'20px'}} variant="contained" color="secondary" onClick={()=>loginAction()}>Login</Button>

            </Card>
        </Box>
    )
}