import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    Text,
    ToastId,
    useToast,
    UseToastOptions,
} from "@chakra-ui/react";
import {FC, useEffect, useRef} from "react";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {authApi} from "@/core/redux/api/auth/auth.api.ts";
import {ConstUrls} from "@/core/constants/urls.ts";
import {FaEnvelope} from "react-icons/fa";
import {TFetchBaseQueryErrorProps} from "@/core/redux/api/auth/auth.baseQuery.ts";
import {getErrorMessage} from "@/core/http/exceptions.ts";
import * as yup from "yup";


const ForgotPassword: FC = () => {
    const intl = useIntl();
    const toastIdRef = useRef<ToastId | null>(null);
    const toast = useToast()
    const navigate = useNavigate();
    const [fetchForgotPassword, {
        isLoading: isSubmitLoading,
        isError,
        error: server_errors,
        isSuccess,
    }] = authApi.usePasswordResetMutation();
    const schema = yup.object().shape({
        email: yup
            .string()
            .email(intl.formatMessage({id: "email.invalid"}))
            .required(intl.formatMessage({id: "required"})),
    });
    const initialValues = {
        email: "",
    }
    const handleSubmit = async (values: {
        email: string;
    }) => {
        await fetchForgotPassword(values);
    }
    useEffect(() => {
        if (!isSubmitLoading && isSuccess) {
            toast({
                title: intl.formatMessage({
                    id: "forgot_password.toast.title",
                }),
                description: intl.formatMessage({
                    id: "forgot_password.toast.description",
                }),
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            navigate(ConstUrls.login);
        }
    }, [isSubmitLoading, isSuccess, navigate, toast, intl]);
    return (
        <Box px={[null, "20px", "5%", "10%"]} py={"5%"} textAlign={"center"}>
            <Heading py="20px">Forgot Password</Heading>
            <Text>Enter your email address. We will send you a code to reset your password</Text>

            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}>
                {
                    ({isSubmitting, setErrors, errors, touched,}) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useEffect(() => {
                            const typed_server_errors = server_errors as TFetchBaseQueryErrorProps;
                            if (isError && typed_server_errors.data) {
                                if (typed_server_errors.data.type === 'validation_error') {
                                    const new_errors: Record<string, string> = {};
                                    const keys = Object.keys(schema.getDefault());
                                    typed_server_errors.data.errors.forEach((item) => {
                                        if (item.attr) {
                                            if (keys.includes(item.attr!)) {
                                                new_errors[item.attr] = getErrorMessage(intl, item, "password_reset")
                                            } else if (item.attr === "non_field_errors") {
                                                new_errors["detail"] = item.detail; // getErrorMessage(intl, item, "login")
                                                const data: UseToastOptions = {
                                                    title: `Validation error`,
                                                    description: new_errors["detail"],
                                                    isClosable: true,
                                                    status: "error",
                                                };
                                                if (toastIdRef.current) {
                                                    toast.update(toastIdRef.current, data);
                                                } else {
                                                    toastIdRef.current = toast(data)
                                                }

                                            }
                                        } else if (item.attr === "non_field_errors") {
                                            new_errors["detail"] = item.detail; // getErrorMessage(intl, item, "login")
                                            const data = {
                                                title: `Validation error`,
                                                description: new_errors["detail"],
                                                isClosable: true,
                                                status: "error",
                                            } as UseToastOptions
                                            if (toastIdRef.current) {
                                                toast.update(toastIdRef.current, data);
                                            } else {
                                                toastIdRef.current = toast(data)
                                            }

                                        }
                                    });
                                    setErrors(new_errors);
                                }
                            } else {
                                setErrors({})
                            }
                        }, [server_errors, isError]);
                        return (
                            <Form>

                                <FormControl mt="4" isInvalid={!!errors.email && touched.email}
                                             w={["100%", "400px", "500px"]} mx={"auto"}>

                                    <Flex align="center" w="100%" p="2px" border="1px" borderColor="gray.100"
                                          borderRadius="0">
                                        <Button bgColor="gray.100" p="3" border="1px" borderRadius="0"
                                                borderColor="gray.100">
                                            <FaEnvelope/>
                                        </Button>
                                        <Field
                                            as={Input}
                                            name="email"
                                            type="email" fontSize="14px" borderRadius="0" border="none"
                                            placeholder="Enter email address"/>
                                    </Flex>
                                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                                </FormControl>

                                <Button fontSize="14px" borderRadius="2px" border="1px solid brand.900"
                                        bgColor="brand.900" color="white"
                                        mx="auto" w={["100%", "400px", "500px"]} mt="6" _hover={{bgColor: "brand.800"}}
                                        type="submit"
                                        isLoading={isSubmitting || isSubmitLoading}>
                                    Reset Password
                                </Button>

                            </Form>
                        )
                    }
                }
            </Formik>

        </Box>
    );
}

export default ForgotPassword;