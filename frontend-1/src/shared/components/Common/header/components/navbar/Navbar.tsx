import { useAppDispatch, useAppSelector } from "@/core/hooks/redux";
import { logout } from "@/core/redux/reducers/authSlice";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { BiStore } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { FiHome, FiShoppingCart } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import CLink from "../../../clink/CLink";
import SearchBar from "../searchbar/SearchBar";
import CNavLink from "./CNavLink";

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    // await logOut()
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data)
    // })
    // .catch(err => console.error)
    // // if(isUserLoggedOut){
    // // } else {
    // //     console.log("Could not log user out")
    // // }
  }

  return (
    <>
      <Button me={["7px", "5px", 0]} fontSize="20px" ms="2" bgColor="white" border="none" onClick={onOpen} minW="auto">
        <HiMenu />
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton py="4" px="3" m="3" border="1px" borderColor="gray.100" borderRadius="0" />
          <DrawerHeader my="2" display="flex" alignItems="center">
            <Avatar size="sm" me="2" />
            <Box>
              <CLink to={isAuthenticated ? "/dashboard" : "/login"} fontSize="14px">{(isAuthenticated && user) ? "Welcome" : "Login"}</CLink>
              <Text fontSize="12px">Personal balance: $0</Text>
            </Box>
          </DrawerHeader>
          <DrawerBody fontSize="14px">

            <SearchBar />

            <Box fontSize="15px" my="8" mx="1">
              <Box fontWeight='600' my="2">
                <CNavLink to={"/"}>
                  <FiHome/> <Text ml={"10px"}>Home</Text>
                </CNavLink>
              </Box>
              <Box fontWeight='600' my="2">
                <CNavLink to={"/shop"}>
                  <BiStore /> <Text ml={"10px"}>Shop</Text>
                </CNavLink>
              </Box>
              <Box fontWeight='600' my="2">
                <CNavLink to={"/cart"}>
                  <FiHome /> <Text ml={"10px"}>Cart</Text>
                </CNavLink>
              </Box>
              <Box fontWeight="600" my="2">
                <CNavLink to={"/wishlist"}>
                  <FiShoppingCart /> <Text ml={"10px"}>Wishlist</Text>
                </CNavLink>
              </Box>
              {
                (!user) ? "" :
                  <Box fontWeight="600" my="2">
                    <Box display="flex" cursor={"pointer"} onClick={() => handleLogout()} py="2" alignItems="center" w="100%" _hover={{ color: "brand.900" }}>
                      <FaSignOutAlt />
                      <Text ml={"10px"} >Logout</Text>
                    </Box>
                  </Box>
              }
            </Box>


            <Box py="2" mt="4">
              <Text fontWeight="600">Info@example.com</Text>
              {/* <SocialLinks /> */}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar;