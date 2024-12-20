import {Button, Flex} from "@chakra-ui/react"
import {FC, useMemo} from "react";
import {FaHeart, FaMinus} from "react-icons/fa";
import {FiHeart, FiShoppingCart} from "react-icons/fi";
import ChangeQuantity from "../cart/ChangeQuantity.tsx";
import {IProduct} from "@/core/models/IProduct.ts";
import {useAppDispatch, useAppSelector} from "@/core/hooks/redux.ts";
import {addProductToCart, removeProductsFromCart} from "@/core/redux/reducers/cartSlice.ts";
import {addProductToWishlist, removeProductsFromWishlist} from "@/core/redux/reducers/wishlistSlice.ts";

interface ICartWishlistProps {
    product: IProduct;
}

const CartWishlist: FC<ICartWishlistProps> = ({product}) => {
    const dispatch = useAppDispatch();
    const cart_data = useAppSelector((state) => state.cart.items)
    const wishlist_data = useAppSelector((state) => state.wishlist.items)
    const productCartItem = useMemo(() => cart_data.entities[product.id], [cart_data, product.id]);
    const productWishlistItem = useMemo(() => wishlist_data.entities[product.id], [wishlist_data, product.id]);

    return (
        <Flex mt="30px" w="100%">
            {
                productCartItem ?
                    <Flex flex="1" align="center">
                        <Button flex="1" me="5px" fontSize="14px" bgColor="gray.100" borderRadius="0"
                                onClick={() => dispatch(removeProductsFromCart([product.id]))}><FaMinus/></Button>
                        <ChangeQuantity cart_item={productCartItem}/>
                    </Flex>
                    :
                    <Button flex="1" fontSize="14px" bgColor="gray.100" borderRadius="0"
                            onClick={() => dispatch(addProductToCart(product))}><FiShoppingCart/></Button>
            }
            {
                productWishlistItem ?
                    <Button fontSize="14px" bgColor="gray.100" color="red" borderRadius="0" ms="1"
                            onClick={() => dispatch(removeProductsFromWishlist([product.id]))}>
                        <FaHeart/>
                    </Button>
                    :
                    <Button fontSize="14px" bgColor="gray.100" borderRadius="0" ms="1"
                            onClick={() => dispatch(addProductToWishlist(product))}>
                        <FiHeart/>
                    </Button>
            }

        </Flex>
    )
}

export default CartWishlist;