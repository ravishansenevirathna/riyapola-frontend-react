import Adminaction from "../../component/Adminaction"
import Customer from "../../component/CustomerPage/Customer";
import GetAllCars from "../../component/GetAllCars"
import Admin from "../../pages/Admin"




const routes=[
    {
        name:"Reservations",
        key:"Admin",
        path:"/reservation",
        component:<Admin/>
    },
    {
        name:"Add New Car",
        key:"Adminaction",
        path:"/addCar",
        component:<Adminaction/>
    },
    {
        name:"All Cars",
        key:"GetAllCars",
        path:"/cars",
        component:<GetAllCars/>
    },
    {
        name:"Customers",
        key:"Customer",
        path:"/customers",
        component:<Customer/>
    }


    
];

export default routes;