import { Box, Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

interface IConnectionErrorExceptionPageProps {

}

const ConnectionErrorExceptionPage: FC<IConnectionErrorExceptionPageProps> = () => {
    const intl = useIntl();

    return (
        <Box
            backgroundColor="c.white.A700"
            boxShadow={{
                base: "",
                sm: "0px 4px 40px #00000040",
            }}
            borderRadius={{
                base: "0px",
                sm: "30px",
            }}
            py={{
                base: "20px",
                md: "30px",
                lg: "40px",
            }}
            px={{
                base: "20px",
                md: "30px",
                lg: "40px",
            }}
            w={{
                base: "100%",
                sm: "87%",
                lg: "80%",
            }}
            h={{
                base: "100%",
                sm: "auto",
            }}
            maxW="780px"
            maxH={{
                base: "1000px",
                md: "715px",
            }}
            mx="auto"
            my={{
                base: "0",
                sm: "50px",
                md: "80px",
            }}
            flex={{
                base: "1",
                sm: "none"
            }}
        >
            <Helmet title={intl.formatMessage({ id: "exceptions_page.connection_error.title" })} />
            <Box
                w="100%" h="100%"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
            >
                <Text textStyle="display3">
                    <FormattedMessage id="exceptions_page.connection_error.heading" defaultMessage="Netwrok error" />
                </Text>
                <Text textStyle="heading4" mt="20px">
                    <FormattedMessage id="exceptions_page.connection_error.message" defaultMessage="Connection to backend refused or does not work." />
                </Text>
                <Button
                    as={Link}
                    to="/"
                    variant="bluePrimary"
                    mt="40px"
                    w={{
                        base: "100%",
                        md: "auto",
                    }}
                    h={{
                        base: "45px",
                        md: "54px",
                    }}
                >
                    <FormattedMessage id="go_home" defaultMessage="Go to Home" />
                </Button>
            </Box>
        </Box>
    );
}

export default ConnectionErrorExceptionPage;