import {Badge, Box, Flex, Image, Link, Text} from "@chakra-ui/react"
import CHeading from "@/shared/components/common/cheading/CHeading.tsx";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {productApi} from "@/core/redux/api/product/product.api.ts";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "./ProductDetail.scss";
import {ChangeEvent, ReactNode} from "react";
import {Autoplay} from "swiper/modules";
import Loader from "@/shared/components/loader/Loader.tsx";
import StarRating from "@/shared/components/product/StartRating.tsx";
import CartWishlist from "@/shared/components/product/CartWishlist.tsx";

const DetailRow = ({label, value, onValueClick,}: {
    label: ReactNode | string;
    value: ReactNode | string;
    onValueClick?: () => void;
}) => {
    const handleValueClick = (e: ChangeEvent<unknown>) => {
        e.preventDefault();
        if (onValueClick) {
            onValueClick();
        }
    }
    return (
        <Flex justify="space-between" py="2">
            <Text as="b">{label}:</Text>
            {
                onValueClick ?
                    <Text as={Link} onClick={handleValueClick}>{value}</Text> :
                    <Text>{value}</Text>
            }
        </Flex>
    )
}
const ProductDetail = () => {
    const {slug} = useParams();
    const navigate = useNavigate();
    if (!slug) {
        return <Navigate to="/shop"/>
    }
    const {data: product_data, isFetching} = productApi.useGetProductQuery({slug});

    const navigateToMenu = () => {
        navigate("/shop")
    }


    const settings = {
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        modules: [Autoplay,],
    }

    if (isFetching) {
        return <Loader/>
    }


    return (
        <main className="product-detail-page">
            <CHeading mainText={"PRODUCT"}/>
            {
                product_data &&
                <Flex justify="" flexWrap="wrap" mx={["20px", "20px", "10%"]} mb="5%">
                    <Flex w={["100%", "100%", "40%"]}>
                        <Swiper className="image-list-slider" {...settings}>
                            <SwiperSlide>
                                <Image src={product_data.thumbnail_image?.url} w="100%" h="100%"
                                       alt={product_data.thumbnail_image?.alt}/>*
                            </SwiperSlide>
                            {
                                (product_data.detail_images || []).map((image_item, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <Image src={image_item?.url} w="100%" h="100%"
                                                   alt={image_item?.url}/>*
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    </Flex>

                    <Box w={["100%", "100%", "60%"]} py="5%" px={["0", "0", "10%"]}>
                        <Text fontSize="25px" fontWeight="600" pb="20px">{product_data?.name}</Text>
                        <Text fontSize="30px" color="gray.500" pb="20px">
                            {
                                product_data?.offer ? <>
                                    ${product_data?.price_of_offer}
                                    <Badge colorScheme="gray" ms="10px"
                                           textDecoration="line-through">
                                        ${product_data?.base_price}
                                    </Badge>
                                </> : (`$${product_data?.base_price}`)
                            }
                        </Text>
                        <StarRating product={product_data}/>
                        <Text my="20px" lineHeight="25px">{product_data?.description}</Text>
                        <Text>CATEGORY: {product_data?.category?.name}</Text>

                        <Text>{product_data?.shortDescription}</Text>
                        <CartWishlist product={product_data}/>
                    </Box>
                </Flex>
            }
            {
                product_data && (
                    <Box w={["auto", "auto", "50%"]} mx={["20px", "20px", "10%"]} mb="10%">
                        <Text fontSize="18px" fontWeight="700" my="20px" color="brand.900">DETAILS</Text>

                        <DetailRow label={"Brand"} value={product_data.brand ? product_data.brand.name : "---"}
                                   onValueClick={() => {
                                       navigateToMenu();
                                   }}/>
                        <DetailRow label={"Category"} value={product_data.category ? product_data.category.name : "---"}
                                   onValueClick={() => {
                                       navigateToMenu();
                                   }}/>
                    </Box>
                )
            }
            {
                product_data &&
                <Box w={["auto", "auto", "50%"]} mx={["20px", "20px", "10%"]} mb="10%">
                    <Text>{product_data?.description}</Text>
                </Box>
            }
        </main>
    )
}

export default ProductDetail;