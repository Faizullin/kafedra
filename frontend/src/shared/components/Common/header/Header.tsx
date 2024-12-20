import {useAppSelector} from "@/core/hooks/redux";
import {Badge, Box, Flex} from "@chakra-ui/react";
import {FC} from "react";
import {FaUserCircle} from "react-icons/fa";
import {FiShoppingCart} from "react-icons/fi";
import {NavLink} from "react-router-dom";
import CLink from "../clink/CLink";
import Logo from "./components/Logo";
import Navbar from "./components/navbar/Navbar";
import SearchBar from "./components/searchbar/SearchBar";
import {ConstUrls} from "@/core/constants/urls.ts";

// const languageOptions: ILangOption[] = [
//   {
//     code: "en",
//     name: "ENG",
//   },
//   {
//     code: "ru",
//     name: "RU",
//   },
// ];

interface IHeaderProps {
}

const Header: FC<IHeaderProps> = () => {
    const {isAuthenticated} = useAppSelector((state) => state.auth);
    // const langDisclosure = useDisclosure();
    // const authDisclosure = useDisclosure();

    // const language_name = useMemo(
    //   () => languageOptions.find((item) => item.code === locale)?.name,
    //   [locale]
    // );
    const cart_data = useAppSelector((state) => state.cart.items)
    // const active = {
    //   color: "brand.900"
    // }


    return (
        <nav>
            <Flex justify="space-between" align="center" shadow="base" px={[null, "0px", "5%", "10%"]} py="2.5">

                {/* Brand logo and name */}
                <Flex
                    align="center"
                    minW="15%"
                    fontSize="18px"
                    color="brand.900"
                    ps={["20px", "20px", 0]}
                >
                    <Logo/>
                </Flex>

                <Box flex="1" me="6" display={["none", "none", "flex"]}>
                    <SearchBar/>
                </Box>

                <Flex align="center" justify="flex-end">
                    <CLink
                        to="/cart"
                        p="2"
                        fontSize="18px"
                        display={["none", "none", "flex"]}
                        me={6} position="relative"
                        as={NavLink}
                        // style={(({ isActive }: any) => {
                        //   console.log("NavKink.styles", isActive)
                        //   return isActive ? active : null
                        // }) as any}
                        _hover={{color: "brand.900"}} title="cart"
                    >
                        <FiShoppingCart/>
                        <Badge
                            color="white" bgColor="brand.900" position="absolute" top="0" right="-5px">
                            {cart_data.ids.length}
                        </Badge>
                    </CLink>

                    {
                        !isAuthenticated ?
                            <CLink
                                to={ConstUrls.login}
                                p="12px"
                                px="6"
                                borderRadius="2"
                                fontSize="14px"
                                bg="brand.900"
                                color="white"
                                _hover={{bg: "brand.800"}}
                            >
                                Login

                            </CLink>
                            :
                            <CLink to="/Dashboard" fontSize={"20px"} opacity={"0.7"}><FaUserCircle/></CLink>
                    }


                    <Navbar/>
                </Flex>
            </Flex>
        </nav>
    )
}

export default Header;
