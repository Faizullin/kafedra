// @ts-ignore
import Ripple from "material-ripple-effects";

import classnames from "classnames";
import {twMerge} from "tailwind-merge";
import {useTheme} from "@material-tailwind/react";
import {ComponentPropsWithoutRef, ElementType, forwardRef, PropsWithChildren, Ref} from "react";

// types
// interface ContainerWithRippleProps<T extends ElementType = "div"> extends ComponentPropsWithRef<T> {
//     ripple?: boolean;
//     className?: string;
//     children: ReactNode;
//     as?: T;
// }
type PolymorphicProps<E extends ElementType> = PropsWithChildren<
    ComponentPropsWithoutRef<E> & {
    as?: E
}>
type ContainerWithRippleProps<T extends ElementType> = PolymorphicProps<T> & {}

const ContainerWithRipple = forwardRef(
    <T extends ElementType = "div">({
                                        ripple = true,
                                        className,
                                        children,
                                        as,
                                        ...rest
                                    }: ContainerWithRippleProps<T>, ref: Ref<T>) => {
        // Initialize ripple effect instance
        const rippleEffect = ripple ? new Ripple() : null;

        // Set styles
        const {container} = useTheme(); // Assuming a theme context with a container style
        const {base} = container?.styles || {};
        const containerBase = base ? base.initial : "";
        const classes = twMerge(classnames(containerBase), className);

        const Component = (as || "div") as any; // todo: fix typescript
        return (
            <Component
                {...rest}
                ref={ref}
                className={classes}
                onMouseDown={(e: any) => { // todo: fix typescript
                    const onMouseDown = rest?.onMouseDown;

                    if (ripple && rippleEffect) {
                        rippleEffect.create(e, "dark");
                    }

                    return typeof onMouseDown === "function" && onMouseDown(e as any);
                }}
            >
                {children}
            </Component>
        );
    },
);

ContainerWithRipple.displayName = "ContainerWithRipple";

export default ContainerWithRipple;
