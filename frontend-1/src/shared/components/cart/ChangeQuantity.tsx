import {Button, Flex} from "@chakra-ui/react";
import {FaMinus, FaPlus} from "react-icons/fa";
import {IProduct} from "@/core/models/IProduct.ts";
import {useAppDispatch} from "@/core/hooks/redux.ts";
import {FC} from "react";
import {setCartData} from "@/core/redux/reducers/cartSlice.ts";
import {ICart} from "@/core/models/ICart.ts";

interface IChangeQuantityProps {
    cart_item: ICart<IProduct>
}

const ChangeQuantity: FC<IChangeQuantityProps> = ({cart_item}) => {
    const dispatch = useAppDispatch();

    const handleIncrease = () => {
        if (cart_item) {
            const new_product_cart = {...cart_item};
            new_product_cart.quantity++;
            dispatch(setCartData(new_product_cart))
        }
    }
    const handleDecrease = () => {
        if (cart_item) {
            const new_product_cart = {...cart_item};
            new_product_cart.quantity--;
            new_product_cart.quantity = new_product_cart.quantity < 1 ? 1 : new_product_cart.quantity;
            dispatch(setCartData(new_product_cart))
        }
    }
    return (
        <Flex justify="flex-end" border="1px solid #e4e4e4" p="3px">
            <Button
                size="sm"
                borderColor="gray.100"
                fontSize="10px"
                borderRadius="0"
                p="1"
                onClick={handleIncrease}>
                <FaPlus/>
            </Button>

            {
                cart_item &&
                <Button
                    size="sm"
                    borderColor="gray.100"
                    fontSize="12px"
                    borderRadius="0"
                    bgColor="whiteAlpha.500"
                    w="40px">
                    {cart_item.quantity || 1}
                </Button>
            }

            <Button
                size="sm"
                borderColor="gray.100"
                fontSize="10px"
                borderRadius="0"
                p="1"
                onClick={handleDecrease}>
                <FaMinus/>
            </Button>
        </Flex>
    )
}

export default ChangeQuantity;