import {getErrorMessage} from "@/core/http/exceptions";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
    ToastId,
    useToast,
    UseToastOptions,
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {useEffect, useRef, useState} from "react";
import {useIntl} from "react-intl";
import {useNavigate, useParams} from "react-router-dom";
import * as yup from "yup";
import {authApi} from "@/core/redux/api/auth/auth.api.ts";
import {ConstUrls} from "@/core/constants/urls.ts";
import {TFetchBaseQueryErrorProps} from "@/core/redux/api/auth/auth.baseQuery.ts";
import {FaEye, FaLock} from "react-icons/fa";

const ForgotPasswordConfirm = () => {
    const intl = useIntl();
    const toastIdRef = useRef<ToastId | null>(null);
    const toast = useToast()
    const navigate = useNavigate();
    const {user_id, token} = useParams();
    const [fetchForgotPasswordConfirm, {
        isLoading: isSubmitLoading,
        isError,
        error: server_errors,
        isSuccess,
    }] = authApi.usePasswordResetConfirmMutation();
    const schema = yup.object({
        new_password1: yup
            .string()
            .required(intl.formatMessage({id: "required"})),
        new_password2: yup
            .string()
            .oneOf(
                [yup.ref("new_password1"),],
                intl.formatMessage({id: "passwords.mustMatch"})
            )
            .required(intl.formatMessage({id: "required"})),
    });
    const initialValues = {
        new_password1: "",
        new_password2: "",
    }
    const [new_password1Type, setPassword1Type] = useState(true)
    const [new_password2Type, setPassword2Type] = useState(true)
    const handleSubmit = async (values: {
        new_password1: string;
        new_password2: string;
    }) => {
        await fetchForgotPasswordConfirm({
            ...values,
            uid: user_id,
            token,
        });
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
                                                new_errors[item.attr] = getErrorMessage(intl, item, "password_reset_confirm")
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
                                        // if (server_errors.type === "validation") {
                                        //     const new_errors = {};
                                        //     const keys = Object.keys(schema.getDefault());
                                        //     server_errors.errors.forEach((item) => {
                                        //         if (keys.includes(item.attr)) {
                                        //             new_errors[item.attr] = getErrorMessage(intl, item, "password_reset_confirm")
                                        //         }
                                        //     });
                                        //     setErrors(new_errors);
                                        // } else if (server_errors.type === "auth") {
                                        //     const possibleKey = `password_reset_confirm.${server_errors.detail}`
                                        //     setErrors({
                                        //         detail: intl.formatMessage({
                                        //             id: possibleKey,
                                        //             defaultMessage: server_errors.detail,
                                        //         }),
                                        //     });
                                        // } else if (server_errors.type === "not-found" && server_errors.server_error_type === "client_error") {
                                        //     setErrors({
                                        //         detail: intl.formatMessage({
                                        //             id: "password_reset_confirm.token_not_found"
                                        //         }),
                                        //     });
                                        // }
                                    });
                                    setErrors(new_errors);
                                }
                            } else {
                                setErrors({})
                            }
                        }, [server_errors, isError]);
                        return (
                            <Form>

                                <FormControl mt="4" isInvalid={!!errors.new_password1 && touched.new_password1}
                                             w={["100%", "400px", "500px"]} mx={"auto"}>

                                    <FormLabel fontSize="14px">Password </FormLabel>

                                    <Flex align="center" w="100%" p="2px" border="1px" borderColor="gray.100"
                                          borderRadius="0">
                                        <Button bgColor="gray.100" p="3" border="1px" borderRadius="0"
                                                borderColor="gray.100">
                                            <FaLock/>
                                        </Button>

                                        <Field
                                            as={Input}
                                            name="new_password1"
                                            type={(new_password1Type) ? "password" : "text"}
                                            fontSize="14px"
                                            borderRadius="0"
                                            border="none"/>
                                        <Button p="3" border="1px" borderRadius="0" borderColor="gray.100"
                                                bgColor="white" onClick={() => setPassword1Type(!new_password1Type)}>
                                            <FaEye/>
                                        </Button>
                                    </Flex>
                                    <FormErrorMessage>{errors.new_password1}</FormErrorMessage>
                                </FormControl>

                                <FormControl mt="4" isInvalid={!!errors.new_password2 && touched.new_password2}
                                             w={["100%", "400px", "500px"]} mx={"auto"}>

                                    <FormLabel fontSize="14px">Password </FormLabel>

                                    <Flex align="center" w="100%" p="2px" border="1px" borderColor="gray.100"
                                          borderRadius="0">
                                        <Button bgColor="gray.100" p="3" border="1px" borderRadius="0"
                                                borderColor="gray.100">
                                            <FaLock/>
                                        </Button>

                                        <Field
                                            as={Input}
                                            name="new_password2"
                                            type={(new_password2Type) ? "password" : "text"}
                                            fontSize="14px"
                                            borderRadius="0"
                                            border="none"/>
                                        <Button p="3" border="1px" borderRadius="0" borderColor="gray.100"
                                                bgColor="white" onClick={() => setPassword2Type(!new_password2Type)}>
                                            <FaEye/>
                                        </Button>
                                    </Flex>
                                    <FormErrorMessage>{errors.new_password2}</FormErrorMessage>
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
};

export default ForgotPasswordConfirm;
