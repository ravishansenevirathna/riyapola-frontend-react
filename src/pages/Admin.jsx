import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import { useEffect } from 'react';
import instance from '../service/ServiceOrder';
import { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'startDate', headerName: 'Start Date', width: 110 },
    { field: 'startTime', headerName: 'Start Time', width: 110 },
    { field: 'endDate', headerName: 'End Date', width: 110 },
    { field: 'endTime', headerName: 'End Time', width: 110 },
    { field: 'pickUpLocation', headerName: 'Pick Up Location', width: 140 },
    { field: 'carId', headerName: 'Car Id', width: 70 },
    { field: 'customerId', headerName: 'Cus Id', width: 70 },
    { field: 'status', headerName: 'Status', width: 100 },
    {
        field: 'action',
        headerName: 'Approve',
        sortable: false,
        width: 130,
        renderCell: (params) => (
          <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={() => sentMail(params.row)}>approve</Button>
        ),
      },
      {
        field: 'declineAction',
        headerName: 'Decline',
        sortable: false,
        width: 130,
        renderCell: (params) => (
          <Button variant="outlined" color="error" onClick={() => declineMail(params.row)}>decline</Button>
        ),
      },
    ];





    // const sentMail = (reservation) => {

    //   const url = `/customer/searchCustomer/${reservation.customerId}`;
    //   instance.get(url)
    //       .then(function(response){
    //         const customerEmail = response.data.email;

    //         const subject = Swal.fire({
    //           title: 'Enter Email Subject',
    //           input: 'text',
    //           inputPlaceholder: 'Subject',
    //           showCancelButton: true
    //         }).then((result) => {
    //           return result.value;
    //         });

    //         if (subject) {
    //           const message = Swal.fire({
    //             title: 'Compose Email Message',
    //             input: 'textarea',
    //             inputLabel: 'Message',
    //             inputPlaceholder: 'Type your message here...',
    //             inputAttributes: {
    //               "aria-label": "Type your message here"
    //             },
    //             showCancelButton: true
    //           }).then((result) => {
    //             return result.value;
    //           });
    //       })
    //       .catch(function (error){
    //         console.log(error);
    //       })
      
    // };

    const sentMail = async (reservation) => {
      console.log(reservation);
    
      const url = `/customer/searchCustomer/${reservation.customerId}`;
      try {
        const response = await instance.get(url);
        const customerEmail = response.data.email;
    
        const subject = await Swal.fire({
          title: 'Enter Email Subject',
          input: 'text',
          inputPlaceholder: 'Subject',
          showCancelButton: true
        }).then((result) => {
          return result.value;
        });
    
        if (subject) {
          const message = await Swal.fire({
            title: 'Compose Email Message',
            input: 'textarea',
            inputLabel: 'Message',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
              "aria-label": "Type your message here"
            },
            showCancelButton: true
          }).then((result) => {
            return result.value;
          });
    
          if (message) {
            const emailData = {
              toMail: customerEmail,
              subject: subject,
              message:message
            };
    
            await instance.post('/reservation/send/mail', emailData);
    
            Swal.fire("Email Sent Successfully!");
          } else {
            Swal.fire("Please enter a message.");
          }
        } else {
          Swal.fire("Please enter a subject.");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error sending email!", error.message, "error");
      }
    };


    




    const declineMail = (reservation) => {
      const reservationId = reservation.id
      const subject = "car not available"
      
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
              console.log(response);
  
  
            })
            .catch(function (error) {
              console.log(error);
            });
  
        }
      });
    };

    




export default function Admin() {

    const[row,setRow] = useState([])

    useEffect(() => {
        instance.get("/reservation/getAllReservations")
        .then(function(response){
          console.log("response is",response.data);
          const array = [];
          response.data?.map((val) => {
            array.push({
                id: val.reservationId,
                startDate: val.startDate,
                startTime: val.startTime,
                endDate: val.endDate,
                endTime: val.endTime,
                pickUpLocation: val.pickUpLocation,
                carId: val.carId,
                customerId: val.customerId,
                status: val.status,
            })
          })
          setRow(array);
          console.log("array is ",array);
        })
        .catch(function (error){
          console.log("your error is",error);
        })
        
        
      }, []);


    return (

        <div style={{ height: 400, width: '100%' }}>
            <Box sx={{ boxShadow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 15px', borderBottom: '1px solid #ddd',   background: `linear-gradient(to right, #d3d3e3, #c0c0d9)`,  }}>
                <BookOnlineIcon sx={{ fontSize: 40, marginRight: 10, color:"primary.main" }}  />
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
                    Reservations
                </Typography>
                <BookOnlineIcon sx={{ fontSize: 40, marginLeft: 10, color:"primary.main" }}/>
               
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
                pageSizeOptions={[5,10]}
                checkboxSelection
            />
        </div>


    )
}