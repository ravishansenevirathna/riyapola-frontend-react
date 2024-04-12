import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import instance from '../../service/ServiceOrder';
import { useEffect } from 'react';
import { useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Email', headerName: 'Email', width: 220 },
    { field: 'TelephoneNumber', headerName: 'Telephone Number', width: 220 },
  
  ];
  
  

export default function Customer() {

  const[row,setRow] = useState([])

  useEffect(() => {
    instance.get("/customer/getAllCustomer")
    .then(function(response){
      console.log(response.data);
      const array = [];
      response.data?.map((val) => {
        array.push({
            id: val.cusId,
            Name: val.name,
            Email: val.email,
            TelephoneNumber: val.telephoneNum
        })
      })
      setRow(array);
    })
    .catch(function (error){
      console.log(error);
    })
    
    
  }, []);


    return(
        <div style={{ height: 400, width: '100%' }}>
          <Box sx={{ boxShadow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 15px', borderBottom: '1px solid #ddd',   background: `linear-gradient(to right, #d3d3e3, #c0c0d9)`,  }}>
                <GroupsIcon sx={{ fontSize: 40, marginRight: 10, color:"primary.main" }}  />
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
                    Customers
                </Typography>
                <GroupsIcon sx={{ fontSize: 40, marginLeft: 10, color:"primary.main" }}/>
               
            </Box>
            <br />
          
        <DataGrid
          rows={row}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    )
}