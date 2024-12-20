import { Link as ChakraLink, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { FC } from "react";
import { Link, LinkProps as RouterLinkProps } from "react-router-dom";

export interface ICLinkProps extends ChakraLinkProps {
    to?: RouterLinkProps['to'];
}

const CLink: FC<ICLinkProps> = ({ to, href, children, as, ...props }) => {
    const typed_props: any = props;
    if (to) {
        if (as === undefined) {
            typed_props.as = Link;
        } else {
            typed_props.as = as;
        }
        typed_props.to = to;
    } else if (href) {
        typed_props.href = href;
    } else {
        throw new Error("CLink can not accept empty");
    }
    return (
        <ChakraLink {...typed_props}>{children}</ChakraLink>
    );
}

export default CLink;