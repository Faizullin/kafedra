'use client'
import {Button as DefaultButton, ButtonProps} from '@material-tailwind/react'

interface Props extends Omit<Omit<ButtonProps, "variant">, "color"> {
    variant?:
        | "filled"
        | "outlined"
        | "gradient"
        | "text"
        | "primary";
    color?: "primary" | "secondary";
}

export default function Button(props: Props) {
    return <DefaultButton {...(props as any)} />;
}