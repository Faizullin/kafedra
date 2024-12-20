import {Box, Heading, Text, useToast,} from "@chakra-ui/react";
import {FC, useEffect, useRef} from "react";
import {useIntl} from "react-intl";
import {useNavigate, useParams} from "react-router-dom";
import {authApi} from "@/core/redux/api/auth/auth.api.ts";
import {ConstUrls} from "@/core/constants/urls.ts";
import Loader from "@/shared/components/loader/Loader.tsx";


const EmailVerification: FC = () => {
    const intl = useIntl();
    const toast = useToast()
    const navigate = useNavigate();
    const {token} = useParams();
    const [fetchEmailVerification, {
        isLoading: isSubmitLoading,
        isError,
        error: server_errors,
        isSuccess,
    }] = authApi.useVerifyEmailMutation();
    useEffect(() => {
        if (!isSubmitLoading && isSuccess) {
            toast({
                title: "Successful confirmation",
                description: "You can sign in",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            navigate(ConstUrls.login);
        }
    }, [isSubmitLoading, isSuccess, navigate, toast, intl]);
    const req = useRef<unknown>()
    useEffect(() => {
        if (!isSubmitLoading && token) {
            req.current = fetchEmailVerification({
                key: token,
            });
        }
        return () => {
            if (req.current) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (req.current as unknown).abort();
            }
        }
    }, [fetchEmailVerification]);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (isError && ((server_errors as unknown).status as number) === 404) {
            navigate("/")
        }
    }, [isError, server_errors]);
    return (
        <Box px={[null, "20px", "5%", "10%"]} py={"5%"} textAlign={"center"}>
            <Heading py="20px">EMail verification</Heading>
            <Text>Your token will be validated</Text>

            <Loader/>
        </Box>
    );
}

export default EmailVerification;