import {IProduct} from "@/core/models/IProduct.ts";
import {ICLinkProps} from "@/shared/components/common/clink/CLink.tsx";

interface IGetUrlResponse {
    url: string;
    use_ssr: boolean;
}

export default function useCLinkDetailProps() {
    const getUrl = (product: IProduct): IGetUrlResponse => {
        const typed_product = product as unknown as Record<string, string>;
        const {use_ssr, render_url} = typed_product;
        if (!use_ssr) {
            return {
                url: `/products/${product.slug}`,
                use_ssr: false,
            }
        } else {
            const split = render_url.split("/");
            let new_render_url = ""
            split.forEach(item => {
                if (render_url.includes(item) && item.startsWith(":")) {
                    const key = item.substring(1)
                    if (typed_product[key] != undefined) {
                        new_render_url = render_url.replace(item, typed_product[key]);
                    }
                }
            })
            return {
                url: new_render_url,
                use_ssr: true,
            }
        }
    }
    return (product: IProduct): ICLinkProps => {
        const url_data = getUrl(product);
        if (url_data.use_ssr) {
            return {
                href: url_data.url
            }
        } else {
            return {
                to: url_data.url,
            }
        }
    }
}