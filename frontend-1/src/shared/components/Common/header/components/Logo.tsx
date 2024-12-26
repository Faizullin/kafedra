import { ImgSrcAssets } from "@/core/constants/img";
import { Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import CLink, { ICLinkProps } from "../../clink/CLink";


const Logo: FC<ICLinkProps> = ({ ...props }) => {
  if (props.to === undefined && props.href === undefined) {
    (props as any).to = "/"
  }
  return (
    <CLink {...props} style={{
      outline: "none"
    }} >
      <Flex gap="10px" justifyContent="start" alignItems="center">
        <Image w="27px" src={ImgSrcAssets.logo} alt="logo" />
        <Text fontWeight={600} color="black" ms="2" title="logo">
          Logo
        </Text>
      </Flex>
    </CLink>
  );
};

export default Logo;
