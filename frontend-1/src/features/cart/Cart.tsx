import {ChangeEvent, useEffect, useState} from "react";
import {Badge, Box, Button, Divider, Flex, Image, Input, Text} from "@chakra-ui/react"
import {FaHandPointDown} from "react-icons/fa";
import {FiTrash} from "react-icons/fi";
import {useAppDispatch, useAppSelector} from "@/core/hooks/redux.ts";
import CLink from "@/shared/components/common/clink/CLink.tsx";
import ChangeQuantity from "@/shared/components/cart/ChangeQuantity.tsx";
import CHeading from "@/shared/components/common/cheading/CHeading.tsx";
import {removeProductsFromCart} from "@/core/redux/reducers/cartSlice.ts";
import {ICart} from "@/core/models/ICart.ts";
import {IProduct} from "@/core/models/IProduct.ts";
import useCLinkDetailProps from "@/core/hooks/useCLinkDetailProps.ts";

const Cart = () => {
    const navigateToProductFn = useCLinkDetailProps();
    const dispatch = useAppDispatch();
    const cart_data = useAppSelector((state) => state.cart.items)
    const [subTotal, setSubTotal] = useState<number>(0)

    const handleRemove = (cart_item: ICart<IProduct>) => {
        dispatch(removeProductsFromCart([cart_item.item_id]))
    }

    const handleProductDetail = (e: ChangeEvent<unknown>, product: IProduct) => {
        e.preventDefault();
        navigateToProductFn(product)
    }

    useEffect(() => {
        let subTotalSum = 0;
        Object.values(cart_data.entities).forEach((item: ICart<IProduct>) => {
            let price = 0;
            if (item.item?.price_of_offer) {
                price = item.item.price_of_offer;
            } else if (item.item?.base_price) {
                price = item.item.base_price;
            }
            subTotalSum += price * (item.quantity || 1);
        })
        setSubTotal(subTotalSum);
    }, [setSubTotal, cart_data])

    return (
        <Box py="50px" px={["20px", "20px", "10%"]}>
            <CHeading mainText={"MY CART"} subText={"Finish up the order and get a reward."}/>

            <Flex flexWrap="wrap">
                <Box w="100%" fontSize="14px">
                    <Flex flexWrap={["wrap", "nowrap"]} align={"flex-start"} bgColor={"#f3f3f3"} my="10px">
                        <Box w={["100%", "100%", "60%"]}>
                            {
                                (cart_data.ids.length === 0) ?
                                    (
                                        <Text p="30px" minH="30vh" bgColor="white">
                                            Your Cart is empty. Add products from the{" "}
                                            <CLink to="/shop" color="brand.900">
                                                Shop
                                            </CLink>
                                        </Text>
                                    ) :
                                    cart_data.ids.map(cart_item_id => {
                                        const cart_item = cart_data.entities[cart_item_id];
                                        const product = cart_item.item!;
                                        return (
                                            <Flex key={cart_item_id} align="center" borderBlock="1px solid #f3f3f3"
                                                  bgColor="white" p="10px">
                                                <CLink href={"#"} onClick={e => handleProductDetail(e, product)}>
                                                    <Image src={product.thumbnail_image?.url} w={["100px", "150px"]} alt={product.thumbnail_image?.alt}/>
                                                </CLink>
                                                <Box p="30px 10px" flex="1">
                                                    <Text fontWeight="bold">{product.name}
                                                        <Badge
                                                            colorScheme="red"
                                                            p="2"
                                                            float="right">
                                                            <FiTrash onClick={() => handleRemove(cart_item)}/>
                                                        </Badge>
                                                    </Text>
                                                    <Text>{product.category?.name}</Text>
                                                    <Flex justify="space-between" align="flex-end" flexWrap="wrap"
                                                          w="100%" mt="6">
                                                        <Text fontSize="18px"
                                                              fontWeight="bold">${product.base_price}</Text>
                                                        <ChangeQuantity cart_item={cart_item}/>
                                                    </Flex>
                                                </Box>
                                            </Flex>

                                        )
                                    })
                            }
                        </Box>

                        <Box p="10px" w={["100%", "100%", "40%"]}>
                            <Flex p="3"><Text>Have a coupon code? Enter here </Text> <Text color="brand.900"
                                                                                           p="5px 10px"><FaHandPointDown/></Text></Flex>
                            <Flex align="center" w="100%" p="2px" mb="5%" border="1px" bgColor="white"
                                  borderColor="gray.100" borderRadius="0">
                                <Input placeholder="Enter code" fontSize="14px" borderRadius="0"/>
                                <Button bgColor="gray.100" fontSize="14px" p="12px 25px" border="1px"
                                        borderColor="gray.100" borderRadius="0">
                                    Redeem code
                                </Button>
                            </Flex>
                            <Text p="3" color="brand.900">ORDER SUMMARY</Text>
                            <Flex justify="space-between" bgColor="white" p="15px">
                                <Text>Subtotal</Text>
                                <Text as="b">${subTotal}</Text>
                            </Flex>
                            <Flex justify="space-between" bgColor="white" p="15px">
                                <Text>Delivery</Text>
                                <Text as="b">$50.90</Text>
                            </Flex>
                            <Flex justify="space-between" bgColor="white" p="15px">
                                <Text>Discount</Text>
                                <Text as="b">%50</Text>
                            </Flex>

                            <Divider/>

                            <Flex justify="space-between" bgColor="white" p="15px">
                                <Text>Total:</Text>
                                <Text as="b" fontSize="20px" color="brand.900">${(subTotal + 50.90) / 2}</Text>
                            </Flex>
                            <Flex m="20px 0" bgColor="white" p="10px">
                                <CLink to="/checkout" p="12px" w="100%" textAlign="center" borderRadius="2px"
                                       color="white" bgColor="brand.900">Checkout now</CLink>
                            </Flex>
                        </Box>


                    </Flex>
                </Box>

            </Flex>
        </Box>
    )
}

export default Cart;