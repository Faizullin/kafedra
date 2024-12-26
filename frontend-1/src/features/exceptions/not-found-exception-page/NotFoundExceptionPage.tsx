import {Flex, Text} from "@chakra-ui/react";
import SearchBar from "@/shared/components/common/header/components/searchbar/SearchBar.tsx";
import CLink from "@/shared/components/common/clink/CLink.tsx";

export default function NotFoundExceptionPage() {
    return (
        <Flex flexDirection="column" gap="4" justify="center" align="center" px={[null, "10px", "5%", "10%"]}
              m="10% 0 50px 0">
            <Text fontWeight="700" as="h1">Couldn't find the page</Text>
            <Text mb="5" color="brand.900" fontSize="70px" fontWeight="800">404 Error</Text>
            <CLink to="/" mb="5"
                   p="12px"
                   px="6"
                   borderRadius="2"
                   fontSize="14px"
                   bg="brand.900"
                   color="white"
                   _hover={{bg: "brand.800"}}>Go back Home</CLink>
            <SearchBar/>
        </Flex>
    );
}
