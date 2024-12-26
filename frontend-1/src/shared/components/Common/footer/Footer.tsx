import {
  Box,
  Flex,
  Text
} from "@chakra-ui/react";
import CLink from "../clink/CLink";
import CNavLink from "../header/components/navbar/CNavLink";

export default function Footer() {
  return (
    <footer>
      <Flex justify="space-between" flexWrap="wrap" py="5%" px={["10px", "20px", "10%"]} fontSize="14px" bgColor="gray.100">

        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">PAGES</Text>

          <CNavLink to={"/"} >Home</CNavLink>
          <CNavLink to={"/shop"} >Shop</CNavLink>
          <CNavLink to={"/cart"} >Cart</CNavLink>
          <CNavLink to={"/wishlist"} >Wishlist</CNavLink>

        </Box>


        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">SERVICES</Text>

          <CNavLink to={"/history"} >History</CNavLink>
          <CNavLink to={"/rewards"} >Rewrads</CNavLink>
          <CNavLink to={"/profile"} >Profile</CNavLink>
          <CNavLink to={"/settings"} >Settings</CNavLink>

        </Box>


        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">SUPPORTS</Text>
          <CNavLink to={"/notifications"} >Notifications</CNavLink>
          <CNavLink to={"/support"} >Support</CNavLink>
          <CNavLink to={"/returns"} >Returns</CNavLink>
          <CNavLink to={"/forum"} >Forum</CNavLink>
        </Box>

        <Box w={["100%", "50%", "30%", "23%"]} my="3" px="3">
          {/* <SocialLinks /> */}
          <Text>Lagos, Nigeria</Text>
          <CLink href="mailto:support@motara.com">Support@motara.com</CLink>
        </Box>
      </Flex>
      <Flex mb={["12%", "12%", 0]} justify="space-between" py="20px" px={["20px", "20px", "10%"]} bgColor="gray.600" color="white" fontSize="14px">
        <Text>Designed by Abel</Text>
        <Text>Copyright &copy; {new Date().getFullYear()}</Text>
      </Flex>
    </footer>
  );
}
