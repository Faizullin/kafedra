import { useLocation } from "react-router-dom";
import CLink from "../clink/CLink";


const BottomNavLink = ({ link, activeLocations, children }: any) => {
    const location = useLocation().pathname;

    const active = "brand.900"

    return (
        <CLink
            to={link}
            p="15px"
            fontSize="20px"
            _hover={{ color: active }}
            color={(activeLocations.indexOf(location) !== -1) ? active : ""}
            title="shop"
            position="relative"
        >
            {children}
        </CLink>
    )
}

export default BottomNavLink;