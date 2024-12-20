import CLink, { ICLinkProps } from "@/shared/components/common/clink/CLink";
import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const CNavLink = ({ children, ...props }: ICLinkProps) => {
    return (
        <Box display="flex">
            <CLink to={props.to} as={NavLink} py="2" display="flex" alignItems="center" w="100%"
                _activeLink={{ color: 'brand.900' }} _hover={{ color: "brand.900" }}>
                {children}
            </CLink>
        </Box>
    )
}

export default CNavLink;