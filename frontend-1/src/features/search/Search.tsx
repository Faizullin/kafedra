import {Box} from "@chakra-ui/react"

// type TResultItem = {
//     model: string;
//     result: unknown,
// } | {
//     model: "product";
//     result: IProduct,
// }

const Search = () => {
    // const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    // const [query, setQuery] = useState<string>("")
    // const [triggerSearch, {data, isFetching, isSuccess}] = searchApi.useLazySearchQuery()
    // const dispatch = useAppDispatch()
    // const cLinkDetailProps = useCLinkDetailProps()
    // // const query = searchParams.get("query").toLowerCase()
    // // const products = useSelector((state) => state.data.products)
    // useEffect(() => {
    //     const raw_query = searchParams.get('query');
    //     if (raw_query === null) {
    //         navigate("/")
    //     } else {
    //         const q = raw_query.toLowerCase();
    //         setQuery(q)
    //         dispatch(setAppliedFilters({
    //             product_list: undefined,
    //             search: {
    //                 filters: {
    //                     query: {
    //                         type: "text",
    //                         data: q,
    //                     },
    //                 },
    //             }
    //         }));
    //         triggerSearch({
    //             query: q,
    //         })
    //     }
    // }, [dispatch, searchParams]);
    // const results = useMemo<Record<string, TResultItem[]>>(() => {
    //     const new_data = {
    //         products: [],
    //     }
    //     if (isSuccess) {
    //         new_data.products = data.map(item.model === 'product')
    //     }
    //     return new_data;
    // }, [data, isSuccess]);
    //
    // if (isFetching) {
    //     return <Loader/>
    // }

    return (
        <Box px={[null, "10px", "5%", "10%"]} minH={"90vh"} m="10% 0 50px 0" bgColor="white" shadow="sm">
            {/*<Text as="h1" opacity="0.8" fontWeight="700" mb="6" mx={"10px"} fontSize={["20px", "20px", "30px"]}>Search*/}
            {/*    results for: <Text as={"span"} color="brand.900">*/}
            {/*        {query}*/}
            {/*    </Text>*/}
            {/*</Text>*/}
            {/*{*/}
            {/*    results.products.map(results_item => {*/}
            {/*        const product = results_item.result as IProduct;*/}
            {/*        return (*/}
            {/*            <Flex p="2" mb="2" key={product.id} position="relative" borderBlock="1px solid #d4d4d4">*/}
            {/*                /!*<Badge bgColor="brand.900" color="white" position="absolute" top="10px"*!/*/}
            {/*                /!*       right="20px">{product.discountPercentage}%</Badge>*!/*/}
            {/*                <CLink {...cLinkDetailProps(product)}>*/}
            {/*                    <Image w="150px" src={product.thumbnail_image?.url} alt={product.thumbnail_image?.alt}*/}
            {/*                           p="4"/>*/}
            {/*                </CLink>*/}
            {/*                <Box p="4" fontSize="14px">*/}
            {/*                    <Flex px="5px" align="center" gap={"20px"} justify="space-between">*/}
            {/*                        <Text fontSize="16px" fontWeight="600">*/}
            {/*                            {product.base_price}*/}
            {/*                            /!*- ((product.discountPercentage / 100) * product.price)}*!/*/}
            {/*                            /!*<Badge colorScheme="gray" ms="10px"*!/*/}
            {/*                            /!*       textDecoration="line-through">${product.price}</Badge>*!/*/}
            {/*                        </Text>*/}
            {/*                        <StarRating product={product}/>*/}
            {/*                    </Flex>*/}
            {/*                    <Text my="20px" p="3px 6px">{product.name}</Text>*/}
            {/*                    <CartWishlist product={product}/>*/}
            {/*                </Box>*/}
            {/*            </Flex>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
        </Box>
    )
}

export default Search;