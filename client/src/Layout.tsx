import {Toaster} from 'sonner';
import {Outlet} from 'react-router-dom';
import {FooterNavbar, Navbar, Splash} from "./components";
import {setKey} from "./utils/local.ts";

const Layout = () => {

    // const set = () => {
    //     setKey('_id', '66fe71459767502c358bfb26');
    //     setKey('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZlNzE0NTk3Njc1MDJjMzU4YmZiMjYiLCJpYXQiOjE3Mjg1NzUxMTEsImV4cCI6MTcyOTAwNzExMX0.8C9ExI60qFBnlKThSYSyQ7Es6UgRbpWBDFzI59sEKCg');
    // }

    return (
        <>
            <Splash/>
            <Toaster position={'top-right'} expand={true} richColors={true} duration={1500} gap={16}/>
            <Navbar/>
            <Outlet/>
            <FooterNavbar/>
        </>
    );
};

export default Layout;