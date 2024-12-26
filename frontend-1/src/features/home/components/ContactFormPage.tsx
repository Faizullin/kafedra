import {Box, Button, Flex, Input, Textarea, ToastId, useToast, UseToastOptions} from '@chakra-ui/react';
import {Field, FieldProps, Form, Formik} from 'formik';
import * as yup from 'yup';
import {FC, useEffect, useRef} from "react";
import {TFetchBaseQueryErrorProps} from "@/core/redux/api/auth/auth.baseQuery.ts";
import {getErrorMessage} from "@/core/http/exceptions.ts";
import {useIntl} from "react-intl";
import {contactApi} from "@/core/redux/api/contact/contact.api.ts";
import CHeading from "@/shared/components/common/cheading/CHeading.tsx";

interface IFormProps {
    name: string;
    subject: string;
    phone: string;
    email: string;
    message: string;
}

interface IContactFormPageProps {
}

const ContactFormPage: FC<IContactFormPageProps> = () => {
    const intl = useIntl();
    const toastIdRef = useRef<ToastId | null>(null);
    const toast = useToast()
    const [sendContactForm, {
        isLoading: isSubmitLoading,
        isError,
        error: server_errors,
        isSuccess,
    }] = contactApi.useSendContactFormMutation()
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        subject: yup.string().required('Subject is required'),
        phone: yup.string().required('Phone is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        message: yup.string().required('Message is required'),
    });


    const initialValues: IFormProps = {
        name: '',
        subject: '',
        phone: '',
        email: '',
        message: '',
    }
    const handleSubmit = async (values: IFormProps) => {
        await sendContactForm(values);
    }
    return (
        <Box bgColor="gray.100" p="5%" mb="30px" fontSize="14px">

            <CHeading mainText={"Contact us"}/>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting, setErrors, errors, touched, resetForm,}) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        const typed_server_errors = server_errors as TFetchBaseQueryErrorProps;
                        if (isError && typed_server_errors.data) {
                            if (typed_server_errors.data.type === 'client_error') {
                                if (typed_server_errors.status === 429) {
                                    const error_detail = typed_server_errors.data.errors.find(item => item.code === 'throttled')
                                    if (error_detail) {
                                        const data: UseToastOptions = {
                                            title: `Send error`,
                                            description: error_detail["detail"],
                                            isClosable: true,
                                            status: "error",
                                        };
                                        if (toastIdRef.current) {
                                            toast.update(toastIdRef.current, data);
                                        } else {
                                            toastIdRef.current = toast(data)
                                        }
                                    }
                                }
                            } else if (typed_server_errors.data.type === 'validation_error') {
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
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    useEffect(() => {
                        if (!isSubmitLoading && isSuccess) {
                            toast({
                                title: "Contact info sent",
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                            });
                            resetForm()
                        }
                    }, [isSubmitLoading, isSuccess, toast]);
                    return (
                        <Form>
                            <Flex
                                direction={"column"}
                                justifyContent="center"
                                alignItems="center">
                                <Box mb="4"
                                     w={["100%", "100%", "300px"]}>
                                    <Field name="name">
                                        {({field}: FieldProps) => (
                                            <Input
                                                {...field}
                                                placeholder="Name"
                                                fontSize="14px"
                                                bgColor="white"
                                                borderColor={errors.name && touched.name ? 'red.500' : 'gray.300'}
                                                borderRadius="0"
                                            />
                                        )}
                                    </Field>
                                    {errors.name && touched.name ? (
                                        <Box color="red.500" fontSize="12px">{errors.name}</Box>
                                    ) : null}
                                </Box>
                                <Box mb="4"
                                     w={["100%", "100%", "300px"]}>
                                    <Field name="subject">
                                        {({field}: FieldProps) => (
                                            <Input
                                                {...field}
                                                placeholder="Subject"
                                                fontSize="14px"
                                                bgColor="white"
                                                borderColor={errors.subject && touched.subject ? 'red.500' : 'gray.300'}
                                                borderRadius="0"
                                            />
                                        )}
                                    </Field>
                                    {errors.subject && touched.subject ? (
                                        <Box color="red.500" fontSize="12px">{errors.subject}</Box>
                                    ) : null}
                                </Box>
                                <Box mb="4"
                                     w={["100%", "100%", "300px"]}>
                                    <Field name="phone">
                                        {({field}: FieldProps) => (
                                            <Input
                                                {...field}
                                                placeholder="Phone"
                                                fontSize="14px"
                                                bgColor="white"
                                                borderColor={errors.phone && touched.phone ? 'red.500' : 'gray.300'}
                                                borderRadius="0"
                                            />
                                        )}
                                    </Field>
                                    {errors.phone && touched.phone ? (
                                        <Box color="red.500" fontSize="12px">{errors.phone}</Box>
                                    ) : null}
                                </Box>
                                <Box mb="4"
                                     w={["100%", "100%", "300px"]}>
                                    <Field name="email">
                                        {({field}: FieldProps) => (
                                            <Input
                                                {...field}
                                                placeholder="Email"
                                                fontSize="14px"
                                                bgColor="white"
                                                borderColor={errors.email && touched.email ? 'red.500' : 'gray.300'}
                                                borderRadius="0"
                                            />
                                        )}
                                    </Field>
                                    {errors.email && touched.email ? (
                                        <Box color="red.500" fontSize="12px">{errors.email}</Box>
                                    ) : null}
                                </Box>
                                <Box mb="4"
                                     w={["100%", "100%", "300px"]}>
                                    <Field name="message">
                                        {({field}: FieldProps) => (
                                            <Textarea
                                                {...field}
                                                placeholder="Message"
                                                fontSize="14px"
                                                bgColor="white"
                                                borderColor={errors.message && touched.message ? 'red.500' : 'gray.300'}
                                                borderRadius="0"
                                            />
                                        )}
                                    </Field>
                                    {errors.message && touched.message ? (
                                        <Box color="red.500" fontSize="12px">{errors.message}</Box>
                                    ) : null}
                                </Box>
                                <Flex justify="center" align="center">
                                    <Button type="submit" bgColor="brand.900" p="10px 25px" border="1px"
                                            borderColor="brand.900" color="white" borderRadius="0"
                                            isLoading={isSubmitting || isSubmitLoading}>
                                        Submit
                                    </Button>
                                </Flex>
                            </Flex>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
        ;
}

export default ContactFormPage;
