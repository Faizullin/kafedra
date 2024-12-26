import {Box, Flex, Grid, Text} from "@chakra-ui/react"
import {productApi} from "@/core/redux/api/product/product.api.ts";
import ShopFilter from "@/features/shop/components/ShopFilter.tsx";
import ProductItem from "@/shared/components/product/ProductItem.tsx";
import {Swiper, SwiperProps, SwiperSlide} from "swiper/react";


import bg1 from "@/assets/img/bg1.webp"
import bg2 from "@/assets/img/bg2.webp"
import bg3 from "@/assets/img/bg3.webp"
import Loader from "@/shared/components/loader/Loader.tsx";

import "swiper/css";

const Shop = () => {
    const {
        data: products_data,
        isFetching: isFetchingProducts
    } = productApi.useGetProductListQuery(undefined);

    const shopSliderSettings: SwiperProps = {
        speed: 500,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        initialSlide: 1,
        breakpoints: {
            768: {
                slidesPerView: 2,
                initialSlide: 1,
            },
            1280: {
                slidesPerView: 3,
                initialSlide: 2,
            },
        },
    };

    return (
        <main className="shop-page">
            <Flex justify="center" w="100%">
                <Swiper {...shopSliderSettings}
                        style={{
                            width: "100%",
                            overflow: "hidden",
                            display: "flex",
                        }}>
                    <SwiperSlide>
                        <Box w="100%" h="250px" backgroundImage={`url(${bg1})`} backgroundSize="cover"
                             bgPosition="50%, 75%">
                            <Box float="right" p="5% 30px" lineHeight="40px" fontSize="0.8rem" w={["50%"]}>
                                <Text mt="30px" fontSize="20px" fontWeight="700" color="brand.900">Get as low as 60%
                                    discount on our chairs</Text>
                            </Box>
                        </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box w="100%" h="250px" backgroundImage={`url(${bg2})`} backgroundSize="cover"
                             bgPosition="50%, 75%">
                            <Box float="right" p="5% 30px" lineHeight="40px" fontSize="0.8rem" w={["50%"]}>
                                <Text mt="30px" fontSize="20px" fontWeight="700" color="brand.900">Free delivery when
                                    you
                                    purchase our Tv stands</Text>
                            </Box>
                        </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box w="100%" h="250px" backgroundImage={`url(${bg3})`} backgroundSize="cover"
                             bgPosition="50%, 75%">
                            <Box float="right" p="5% 30px" lineHeight="40px" fontSize="0.8rem" w={["50%"]}>
                                <Text mt="30px" fontSize="20px" fontWeight="700" color="brand.900">Flash sales ongoing
                                    for
                                    our sofa collections</Text>
                            </Box>
                        </Box>
                    </SwiperSlide>
                </Swiper>
            </Flex>

            <Flex my="5%" mx={["20px", "20px", "10%"]} flexWrap="wrap">

                <ShopFilter/>

                <Box w={["100%", "100%", "auto"]} flex="1">
                    {
                        isFetchingProducts ? <Loader/> :
                            <Grid gap={4}
                                  templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}>
                                {products_data &&
                                    products_data.results.map(product => {
                                        return (
                                            <ProductItem key={product.id} product={product}/>
                                        )
                                    })
                                }
                            </Grid>
                    }
                </Box>
            </Flex>

        </main>
    )
}

export default Shop;