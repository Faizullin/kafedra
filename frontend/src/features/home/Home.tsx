import Loader from "@/shared/components/loader/Loader";
import {Badge, Box, Flex, Grid, Image, Text} from "@chakra-ui/react";
import {FC, lazy, Suspense, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useIntl} from "react-intl";
import bg from "@/assets/img/bg.jpg";
import bg1 from "@/assets/img/bg1.webp";
import bg2 from "@/assets/img/bg2.webp";
import bg3 from "@/assets/img/bg3.webp";
import bgsofas2 from "@/assets/img/bgsofas.webp";
import CHeading from "@/shared/components/common/cheading/CHeading";
import CLink from "@/shared/components/common/clink/CLink";
import HeroSection from "./components/HeroSection";
import {IProduct} from "@/core/models/IProduct.ts";

const ContactFormPage = lazy(() => import("./components/ContactFormPage.tsx"));
const ProductItem = lazy(() => import("@/shared/components/product/ProductItem.tsx"));

interface IHomeProps {
}

const Home: FC<IHomeProps> = () => {
    const intl = useIntl();
    const [products] = useState<IProduct[]>([]);

    // useEffect(() => {
    //     if (isError) {
    //         console.log(error);
    //     }
    // }, [isError, error]);

    return (
        <Box w="100%">
            <Helmet>
                <title>
                    {intl.formatMessage({
                        id: "home_title",
                    })}
                </title>
                <meta
                    name="Description"
                    content="Explore the best travel destinations 2024 and explore top picks"
                />
            </Helmet>
            <main className="home-page">
                <Box>
                    <Flex justify="flex-end" align="center" position="relative">
                        <Box w={["100%", "100%", "70%"]}>
                            <Suspense fallback={<Loader/>}>
                                <Box w="100%" h="600px" backgroundImage={`url(${bgsofas2})`} backgroundSize="cover"
                                     bgPosition="50%, 75%"></Box>
                            </Suspense>
                        </Box>
                        <HeroSection mainText={"Minimalistic and Modern Interior."}
                                     subText={"Upgrade your personality with our quality products. You can never go wrong with any of our products."}/>
                    </Flex>

                    <Box fontSize="14px" px={[null, "10px", "5%", "10%"]} m="10% 0 50px 0">
                        <CHeading mainText={"GET AWESOME DISCOUNTS ON ALL PURCHASE"}
                                  subText={"Offers, Incentives and discounts all for you."}/>
                        <Flex justify="space-between" flexWrap="wrap" px={["20px", "20px", null]}>
                            <CLink to="/shop" w={["100%", "48%", "32%"]} textAlign="right"
                                   backgroundImage={`url(${bg1})`} bgSize="cover" my={["15px", null]}>
                                <Box p="50px">
                                    <Text fontWeight="600">SOFA</Text>
                                    <Text fontWeight="600" color="brand.900" mb="20px"><Badge colorScheme="green">SAVE
                                        30%</Badge></Text>
                                </Box>
                            </CLink>
                            <CLink to="/shop" w={["100%", "48%", "32%"]} textAlign="right"
                                   backgroundImage={`url(${bg2})`} bgSize="cover" my={["15px", null]}>
                                <Box p="50px">
                                    <Text fontWeight="600">NEW ARRIVAL</Text>
                                    <Text fontWeight="600" color="brand.900" mb="20px"><Badge colorScheme="green">SAVE
                                        50%</Badge></Text>
                                </Box>
                            </CLink>
                            <CLink to="/shop" w={["100%", "48%", "32%"]} textAlign="right"
                                   backgroundImage={`url(${bg3})`} bgSize="cover" my={["15px", null]}>
                                <Box p="50px">
                                    <Text fontWeight="600">CHAIR</Text>
                                    <Text fontWeight="600" color="brand.900" mb="20px"><Badge colorScheme="green">SAVE
                                        20%</Badge></Text>
                                </Box>
                            </CLink>
                        </Flex>
                    </Box>


                    <Box py="5%" px={[null, "20px", "5%", "10%"]}>
                        <CHeading mainText={"HOT DEALS FOR YOU"}
                                  subText={"Our customers most loved products you can also get."}/>

                        <Grid gap={4} w="100%"
                              templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}>
                            {
                                products.map((product) => {
                                    return (
                                        <Suspense key={product.id} fallback={<div>Loading...</div>}>
                                            <ProductItem key={product.id} product={product}/>
                                        </Suspense>
                                    )
                                }) || ""
                            }
                        </Grid>
                    </Box>

                    <Box py="5%" px={[null, "0", "5%", "10%"]} my="5%">
                        <Flex justify="space-between" flexWrap="wrap">
                            <Box w={[null, "100%", "40%"]} p="5%" ps={["5%", "5%", 0]}>
                                <Text fontSize={["20px", "30px"]} fontWeight="700" pb="15px">Artistic Designs with
                                    unique shapes.</Text>
                                <Text fontSize="14px" fontWeight="600" mb="35px">Purpose of a furniture is to keep you
                                    comfortable while also beautifying your home</Text>
                                <CLink to="/Shop" fontSize="14px" p="10px 20px" bgColor="brand.900" color="white"
                                       _hover={{bgColor: "orange.500"}}>Shop now</CLink>
                            </Box>
                            <Image src={bg} w={[null, "100%", "60%"]} alt="bg" border="5px" borderStyle="solid"
                                   borderColor="gray.300" loading="lazy"/>
                        </Flex>
                    </Box>

                    <ContactFormPage/>

                </Box>
            </main>
            {/* <Footer /> */}
        </Box>
    );
};

export default Home;
