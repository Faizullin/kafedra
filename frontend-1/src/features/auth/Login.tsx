import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Switch,
    Text,
    ToastId,
    useToast,
    UseToastOptions
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {FaEnvelope, FaEye, FaLock} from "react-icons/fa";
import {useIntl} from "react-intl";
import * as yup from "yup";
import CLink from "@/shared/components/common/clink/CLink.tsx";
import {authApi} from "@/core/redux/api/auth/auth.api.ts";
import {Field, Form, Formik} from "formik";
import useRedirectBack from "@/core/hooks/useRedirectBack.ts";
import {TFetchBaseQueryErrorProps} from "@/core/redux/api/auth/auth.baseQuery.ts";
import {getErrorMessage} from "@/core/http/exceptions.ts";


const Login = () => {
    const intl = useIntl();
    const toastIdRef = useRef<ToastId | null>(null);
    const toast = useToast()
    const {redirect} = useRedirectBack();
    const [loginUser, {
        isLoading: isLoginLoading,
        isError,
        error: server_errors,
        isSuccess,
    }] = authApi.useLoginMutation()
    const [, {isLoading: isMeLoading}] = authApi.useLazyGetMeQuery()
    const [type, setType] = useState(true)

    const isSubmitLoading = isLoginLoading || isMeLoading;

    const schema = yup.object().shape({
        email: yup
            .string()
            .email(intl.formatMessage({id: "email.invalid"}))
            .required(intl.formatMessage({id: "required"})),
        password: yup
            .string()
            .required(intl.formatMessage({id: "required"})),
    });
    const initialValues = {
        email: "",
        password: "",
    };

    const handleLogin = async (values: {
        email: string;
        password: string;
    }) => {
        await loginUser(values);
    }

    useEffect(() => {
        if (!isLoginLoading && isSuccess) {
            toast({
                description: 'You successfully logged in',
                isClosable: true,
                status: "success",
            });
            redirect();
        }
    }, [isLoginLoading, isSuccess, redirect, toast]);


    return (
        <Flex m="20px" justify="center" fontSize="14px">
            <Flex justify="center" w="100%" bgColor="whiteAlpha.500">
                <Box w={["100%", "400px", "500px"]} p="20px" m="20px" bgColor="white">
                    <Heading textAlign="center">Welcome back!</Heading>
                    <Text textAlign="center" fontWeight="600" py="3">Enter your email and password.</Text>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={handleLogin}
                    >
                        {({isSubmitting, setErrors, errors, touched,}) => {
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
                                                    new_errors[item.attr] = getErrorMessage(intl, item, "login")
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
                                    <FormControl mt="4" isInvalid={!!errors.email && touched.email}>
                                        <FormLabel fontSize="14px">Email address </FormLabel>

                                        <Flex align="center" w="100%" p="2px" border="1px" borderColor="gray.100"
                                              borderRadius="0">
                                            <Button bgColor="gray.100" p="3" border="1px" borderRadius="0"
                                                    borderColor="gray.100">
                                                <FaEnvelope/>
                                            </Button>
                                            <Field
                                                as={Input}
                                                type="email"
                                                name="email"
                                                fontSize="14px"
                                                borderRadius="0"
                                                border="none"
                                            />
                                        </Flex>
                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt="4" isInvalid={!!errors.password && touched.password}>
                                        <FormLabel fontSize="14px">Password </FormLabel>

                                        <Flex align="center" w="100%" p="2px" border="1px" borderColor="gray.100"
                                              borderRadius="0">
                                            <Button bgColor="gray.100" p="3" border="1px" borderRadius="0"
                                                    borderColor="gray.100">
                                                <FaLock/>
                                            </Button>

                                            <Field
                                                as={Input}
                                                name="password"
                                                type={type ? "password" : "text"}
                                                fontSize="14px"
                                                borderRadius="0"
                                                border="none"
                                            />
                                            <Button p="3" border="1px" borderRadius="0" borderColor="gray.100"
                                                    bgColor="white"
                                                    onClick={() => setType(!type)}>
                                                <FaEye/>
                                            </Button>
                                        </Flex>
                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    </FormControl>

                                    <Flex justify="space-between" my="5">
                                        <FormControl display="flex">
                                            <Switch size="sm" id="remember" colorScheme="orange"/>
                                            <FormLabel htmlFor="remember" ms="2" fontSize="12px">Remember
                                                me</FormLabel>
                                        </FormControl>
                                        <CLink to="/auth/password/reset" w="150px" fontSize="14px" color="red">
                                            Forgot password?
                                        </CLink>
                                    </Flex>

                                    <Button
                                        fontSize="14px" borderRadius="2px" border="1px solid brand.900"
                                        bgColor="brand.900"
                                        color="white" w="100%" mt="6" _hover={{bgColor: "brand.800"}}
                                        type="submit"
                                        isLoading={isSubmitting || isSubmitLoading}
                                    >
                                        Login
                                    </Button>

                                    <Text mt="4">Don't have an account yet?{" "}
                                        <CLink to="/auth/register" color="brand.900">Sign up</CLink>
                                    </Text>
                                </Form>
                            )
                        }}
                    </Formik>

                </Box>
            </Flex>
        </Flex>
    )
}

export default Login;