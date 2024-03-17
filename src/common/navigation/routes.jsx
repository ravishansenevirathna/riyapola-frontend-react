import Adminaction from "../../component/Adminaction"
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
        name:"Add Car",
        key:"Adminaction",
        path:"/addCar",
        component:<Adminaction/>
    },
    {
        name:"Available Cars",
        key:"GetAllCars",
        path:"/cars",
        component:<GetAllCars/>
    }
    
];

export default routes;