import CLink from "@/shared/components/common/clink/CLink";
import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

interface IHeroSectionProps {
    mainText: string;
    subText: string;
}

const HeroSection: FC<IHeroSectionProps> = ({ mainText, subText }) => {
    return (
        <Box
            w={[null, "100%", "40%"]}
            position="absolute" left={["0", "0", "10%"]} top={["0", "0", "auto"]}
            p={"5%"} pt={["10%", "5%", "5%"]} pb="80px" ps={["5%", "5%", 0]}
            bgColor={["blackAlpha.600", "blackAlpha.600", "whiteAlpha.800"]}
            color={["white", "white", "black"]}
        >
            <Text fontSize="40px" lineHeight="50px" fontWeight="700" pb="15px" >{mainText}</Text>
            <Text fontSize="14px" lineHeight="30px" fontWeight="600" mb="35px">{subText}</Text>
            <CLink
                to="/shop"
                p="12px"
                px="6"
                borderRadius="2"
                fontSize="14px"
                bg="brand.900"
                color="white"
                _hover={{ bg: "brand.800" }}
            >
                Shop now
            </CLink>
        </Box>
    )
}

export default HeroSection;