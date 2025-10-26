import { Outlet } from "react-router-dom";

function Layout(){
    return (
        <div>
            <div>
                <Outlet/>
            </div>
        </div>
    )

}
export default Layout;