import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface ICHeadingProps {
    mainText?: string;
    subText?: string;
}

const CHeading: FC<ICHeadingProps> = ({ mainText, subText }) => {
    return (
        <Box data-testid="heading" textAlign="center" p="10px" mb="20px">
            <Text fontSize="20px" fontWeight="700" color="brand.900" lineHeight="40px" my="10px">{mainText}</Text>
            <Text fontWeight="600">{subText}</Text>
        </Box>
    )
}

export default CHeading;