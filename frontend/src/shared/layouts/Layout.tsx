import { Outlet } from "react-router-dom";
import MobileBottombar from "../components/common/bottombar/Bottombar";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import { Box } from "@chakra-ui/react";

export default function Layout() {
    return (
        <Box w="100%">
            <Header />
            <Outlet />
            <MobileBottombar />
            <Footer />
        </Box>
    );
}
