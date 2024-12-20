import {useAppSelector} from "@/core/hooks/redux.ts";
import {Box, Grid} from "@chakra-ui/react";
import CHeading from "@/shared/components/common/cheading/CHeading.tsx";
import ProductItem from "@/shared/components/product/ProductItem.tsx";

const Wishlist = () => {
    const wishlist_data = useAppSelector((state) => state.wishlist.items)


    return (
        <Box py="30px">
            <CHeading mainText={"MY WISHLIST"}
                      subText={"Your saved products are all here. You can add them to cart from here."}/>

            <Grid gap={4} templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
                  px={["20px", "20px", "10%"]}>
                {
                    wishlist_data.ids.map(wishlist_item_id => {
                        const product = wishlist_data.entities[wishlist_item_id].item!;
                        return (
                            <ProductItem key={wishlist_item_id} product={product}/>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default Wishlist;