import {Flex} from "@chakra-ui/react"
import {FaStar} from "react-icons/fa"
import {FC} from "react";
import {IProduct} from "@/core/models/IProduct.ts";

interface IStarRatingProps {
    product?: IProduct;
}

const StarRating: FC<IStarRatingProps> = ({product}) => {
    const rating = product?.rating || 0;
    return (
        <Flex>
            {
                [1, 2, 3, 4, 5].map(value => (
                    <FaStar key={value}
                            style={{color: (rating > value) ? "orange" : "#d4d4d4", margin: "2px", fontSize: "10px"}}/>
                ))
            }
        </Flex>
    )
}

export default StarRating;