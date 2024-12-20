import {Button, Flex, Input} from "@chakra-ui/react";
import {ChangeEvent, useState} from "react";
import {FaSearch} from "react-icons/fa";
import {useAppDispatch} from "@/core/hooks/redux.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {IFiltersState, setAppliedFilters} from "@/core/redux/reducers/filter/filter.slice.ts";
import {productApi} from "@/core/redux/api/product/product.api.ts";

const SearchBar = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    // const product_list_data = useAppSelector(state => state.filter.filters.product_list)
    // const search_data = useAppSelector(state => state.filter.filters).search
    // searchApi.useSearchQuery({
    //     query: "",
    // });
    const [query, setQuery] = useState<string>("")
    const location = useLocation()
    // const [searchMethod, setSearchMethod] = useState<keyof IFiltersState>("search")
    // useEffect(() => {
    //     if (location.pathname === '/shop') {
    //         setSearchMethod('product_list')
    //     } else if (location.pathname === '/product') {
    //         setSearchMethod('product_list')
    //     }
    // }, [location]);
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: Partial<IFiltersState> = {
            search: undefined,
            product_list: undefined,
        }
        // if (searchMethod === 'product_list') {
        //     data.product_list = {
        //         filters: {
        //             search: {
        //                 type: "text",
        //                 data: query,
        //             },
        //         }
        //     }
        //     dispatch(setAppliedFilters(data));
        //     dispatch(productApi.util.invalidateTags(['Product']));
        // } else if (searchMethod === 'search') {
        //     navigate(`/search?query=${query}`);
        // }
        data.product_list = {
            filters: {
                search: {
                    type: "text",
                    data: query,
                },
            }
        }
        dispatch(setAppliedFilters(data));
        if (location.pathname === "/shop") {
            dispatch(productApi.util.invalidateTags(['Product']));
        } else {
            dispatch(productApi.util.invalidateTags(['Product']));
            navigate("/shop")
        }
    }
    return (
        <form style={{flex: 1}} onSubmit={handleSubmit}>
            <Flex
                align="center"
                w="100%" p="2px"
                border="1px"
                bg="gray.100"
                borderColor="gray.200"
                borderRadius="30px"
                position="relative"
            >
                <Input placeholder="Search here" className="query" name="query" fontSize="14px" border="none"
                       type="search" borderRadius="30px"
                       value={query} onChange={(e) => {
                    setQuery(e.target.value)
                }}/>

                <Button type="submit" bgColor="gray.100" p="3" border="1px" borderRadius="30px" borderColor="gray.100">
                    <FaSearch/>
                </Button>
            </Flex>
        </form>
    )
}

export default SearchBar;