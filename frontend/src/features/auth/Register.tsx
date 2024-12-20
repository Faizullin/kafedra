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
import {useNavigate} from "react-router-dom";
import CLink from "@/shared/components/common/clink/CLink.tsx";
import {FaEnvelope, FaEye, FaLock, FaUser} from "react-icons/fa";
import {authApi} from "@/core/redux/api/auth/auth.api.ts";
import {ConstUrls} from "@/core/constants/urls.ts";
import {TFetchBaseQueryErrorProps} from "@/core/redux/api/auth/auth.baseQuery.ts";
import * as yup from "yup";

export default function Register() {
    const intl = useIntl();
    const toastIdRef = useRef<ToastId | null>(null);
    const toast = useToast()
    const navigate = useNavigate();
    const [registerUser, {
        isLoading: isSubmitLoading,
        isError,
        error: server_errors,
        isSuccess,
    }] = authApi.useRegisterMutation();
    const schema = yup.object().shape({
        email: yup
            .string()
            .email(intl.formatMessage({id: "email.invalid"}))
            .required(intl.formatMessage({id: "required"})),
        password1: yup
            .string()
            .required(intl.formatMessage({id: "required"})),
        password2: yup
            .string()
            .oneOf(
                [yup.ref("password1"),],
                intl.formatMessage({id: "passwords.mustMatch"})
            )
            .required(intl.formatMessage({id: "required"})),
        username: yup
            .string()
            .required(intl.formatMessage({id: "required"})),
    });
    const initialValues = {
        username: "",
        email: "",
        password1: "",
        password2: "",
    };
    const [password1Type, setPassword1Type] = useState(true)
    const [password2Type, setPassword2Type] = useState(true)
    const handleRegister = async (values: {
        username: string;
        email: string;
        password1: string;
        password2: string;
    }) => {
        await registerUser(values);
    }
    useEffect(() => {
        if (!isSubmitLoading && isSuccess) {
            toast({
                description: 'You successfully signed up',
                isClosable: true,
                status: "success",
            });
            navigate(ConstUrls.login);
        }
    }, [isSubmitLoading, isSuccess, navigate, toast]);
    return (
        <Flex m="20px" justify="center" fontSize="14px">
            <Flex justify="center" w="100%">
                <Box p="20px" w={["100%", "400px", "500px"]} my="20px" bgColor="white" shadow="md">
                    <Heading textAlign="center">Register!</Heading>
                    <Text textAlign="center" fontWeight="600" py="3">Fill in your details to signup.</Text>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={handleRegister}
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
                                                    new_errors[item.attr] = getErrorMessage(intl, item, "register")
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
                                    <FormControl mt="4" isInvalid={!!errors.username && touched.username}>
                                        <FormLabel fontSize="14px">Username </FormLabel>

                                        <Flex align="center" w="100%" p="2px" border="1px" borderColor="gray.100"
                                              borderRadius="0">
                                            <Button bgColor="gray.100" p="3" border="1px" borderRadius="0"
                                                    borderColor="gray.100">
                                                <FaUser/>
                                            </Button>
                                            <Field
                                                as={Input}
                                                name="username"
                                                type="text" fontSize="14px" borderRadius="0" border="none"/>
                                        </Flex>
                                        <FormErrorMessage>{errors.username}</FormErrorMessage>
                                    </FormControl>

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
                                                name="email"
                                                type="email" fontSize="14px" borderRadius="0" border="none"/>
                                        </Flex>
                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt="4" isInvalid={!!errors.password1 && touched.password1}>
                                        <FormLabel fontSize="14px">Password </FormLabel>

                                        <Flex align="center" w="100%" p="2px" border="1px" borderColor="gray.100"
                                              borderRadius="0">
                                            <Button bgColor="gray.100" p="3" border="1px" borderRadius="0"
                                                    borderColor="gray.100">
                                                <FaLock/>
                                            </Button>

                                            <Field
                                                as={Input}
                                                name="password1"
                                                type={(password1Type) ? "password" : "text"}
                                                fontSize="14px"
                                                borderRadius="0"
                                                border="none"/>
                                            <Button p="3" border="1px" borderRadius="0" borderColor="gray.100"
                                                    bgColor="white" onClick={() => setPassword1Type(!password1Type)}>
                                                <FaEye/>
                                            </Button>
                                        </Flex>
                                        <FormErrorMessage>{errors.password1}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt="4"
                                                 isInvalid={!!errors.password2 && touched.password2}>
                                        <FormLabel fontSize="14px">Confirm Password </FormLabel>

                                        <Flex align="center" w="100%" p="2px" border="1px" borderColor="gray.100"
                                              borderRadius="0">
                                            <Button bgColor="gray.100" p="3" border="1px" borderRadius="0"
                                                    borderColor="gray.100">
                                                <FaLock/>
                                            </Button>
                                            <Field
                                                as={Input}
                                                name="password2"
                                                type={(password2Type) ? "password" : "text"}
                                                fontSize="14px"
                                                borderRadius="0"
                                                border="none"/>
                                            <Button p="3" border="1px" borderRadius="0" borderColor="gray.100"
                                                    bgColor="white" onClick={() => setPassword2Type(!password2Type)}>
                                                <FaEye/>
                                            </Button>
                                        </Flex>
                                        <FormErrorMessage>{errors.password2}</FormErrorMessage>
                                    </FormControl>


                                    <Button fontSize="14px" borderRadius="2px" border="1px solid brand.900"
                                            bgColor="brand.900" color="white" w="100%" mt="6"
                                            _hover={{bgColor: "brand.800"}}
                                            type="submit"
                                            isLoading={isSubmitting || isSubmitLoading}>
                                        Sign up
                                    </Button>
                                    <Text mt="4">
                                        Already have an account?{" "}
                                        <CLink to={ConstUrls.login} color="brand.900">Login</CLink>
                                    </Text>
                                </Form>
                            );
                        }}
                    </Formik>
                </Box>
            </Flex>
        </Flex>
    );
}
