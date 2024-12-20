import {Badge, Box, Flex, Image, Text} from "@chakra-ui/react";
import {FC, Suspense} from "react";
import {IProduct} from "@/core/models/IProduct.ts";
import StarRating from "@/shared/components/product/StartRating.tsx";
import CartWishlist from "@/shared/components/product/CartWishlist.tsx";
import useCLinkDetailProps from "@/core/hooks/useCLinkDetailProps.ts";
import CLink from "@/shared/components/common/clink/CLink.tsx";

const renderLoader = () => <p>Loading</p>;

const ProductItem: FC<{
    product: IProduct,
}> = ({product}) => {
    const cLinkDetailProps = useCLinkDetailProps();

    return (
        <Box position="relative" shadow="base">
            <Suspense fallback={renderLoader()}>
                {
                    product.offer && (
                        <Badge bgColor="brand.900" color="white" position="absolute" top="10px"
                               right="10px">{product.offer?.discount}%</Badge>
                    )
                }
                <CLink {...cLinkDetailProps(product)}>
                    <Image w="100%" src={product.thumbnail_image?.url} alt={product.thumbnail_image?.alt} p="4"/>
                </CLink>
                <Box p="4" fontSize="14px">
                    <Flex px="5px" align="center" justify="space-between">
                        <Text fontSize="16px" fontWeight="600">
                            {
                                product.offer ? <>
                                    ${product.price_of_offer}
                                    <Badge colorScheme="gray" ms="10px"
                                           textDecoration="line-through">
                                        ${product.base_price}
                                    </Badge>
                                </> : (`$${product.base_price}`)
                            }
                        </Text>
                        <StarRating product={product}/>
                    </Flex>
                    <Text my="20px" p="3px 6px">{product.name}</Text>
                    <CartWishlist product={product}/>
                </Box>
            </Suspense>
        </Box>
    )
}

export default ProductItem;