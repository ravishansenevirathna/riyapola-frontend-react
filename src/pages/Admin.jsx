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



    const sentMail = async (reservation) => {
    
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
            window.location.reload();

           

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

       const updateData = {
              status: "approved"
            };

      instance({
        method: 'put',
        url: '/reservation/updateReservation/' + reservation.id,
        data: updateData
      })
        .then(function (response) {
          console.log(response);
          
        })
        .catch(function (error) {
          console.log(error);
        });


    };



    const declineMail = async (reservation) => {
      
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will decline the reservation and send an email to the customer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, decline it!',
      });

      if (!confirmation.isConfirmed) {
        return; // User canceled
      }


      try {
        // Update reservation status to declined on the backend
        const updateResponse = await instance.put(`/reservation/updateReservation/${reservation.id}`, {
          status: 'declined',
        });
        

        if (updateResponse.status === 200) {
          // Success: Send email and (optionally) refetch data
    
          // Fetch customer email (assuming separate API call for efficiency)
          const customerEmailResponse = await instance.get(`/customer/searchCustomer/${reservation.customerId}`);
          const customerEmail = customerEmailResponse.data.email;
    
          // Prepare email data
          const emailData = {
            toMail: customerEmail,
            subject: 'Car Unavailable for Reservation', // More descriptive subject
            message: 'We regret to inform you that your car reservation is unavailable at this time. Please try again another time or contact us for assistance.',
          };

            // Send email (assuming success handling is done elsewhere)
      await instance.post('/reservation/send/mail', emailData);

      Swal.fire('Success!', 'Reservation declined and email sent.', 'success');
      window.location.reload();

      // Optionally, refetch reservations to update table data (see Admin component)
    }

    else {
      console.error('Error updating reservation status:', updateResponse.data);
      Swal.fire('Error!', 'Failed to decline reservation.', 'error');
    }
  } catch (error) {
    console.error('Error declining reservation:', error);
    Swal.fire('Error!', 'Something went wrong during decline.', 'error');
  }
};


    //   .then((result) => {
    //     if (result.isConfirmed) {
          
    //       instance({
    //         method: 'put',
    //         url: '/reservation/updateReservation/' + reservationId,
    //         data: updateData
    //       })
    //         .then(function (response) {
              
    //           const url = `/customer/searchCustomer/${reservation.customerId}`;
    //           const responseData = instance.get(url);
    //           console.log("response isssss",responseData);
    //           const customerEmail = responseData.data.email;

    //           const subject = 'your car not available';
    //           const message ='please try angain another time line';
    //           const emailData = {
    //             toMail: customerEmail,
    //             subject: subject,
    //             message:message
    //           };
      
    //           instance.post('/reservation/send/mail', emailData);
    //           Swal.fire("Email Sent Successfully!");
              
  
  
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
  
    //     }
    //   });
    // };


export default function Admin() {

    const[row,setRow] = useState([])

    useEffect(() => {
      fetchReservations();
  }, []);

      const fetchReservations = () => {
        instance.get("/reservation/getAllReservations")
        .then(function(response){
          
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
      }
        



  
    

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