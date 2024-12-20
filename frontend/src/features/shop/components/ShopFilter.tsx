import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    Flex,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Select,
    Skeleton,
    Text
} from "@chakra-ui/react";
import {ChangeEvent, FC, useEffect, useMemo, useState} from "react";
import {productApi} from "@/core/redux/api/product/product.api.ts";
import {IOffer, IProductBrand, IProductCategory} from "@/core/models/IProduct.ts";
import {useAppDispatch, useAppSelector} from "@/core/hooks/redux.ts";
import {clearAppliedFilters, setAppliedFilters} from "@/core/redux/reducers/filter/filter.slice.ts";

interface IShopFilterProps {
}

const ShopFilter: FC<IShopFilterProps> = () => {
    const dispatch = useAppDispatch()
    const {filters: appliedFilters,} = useAppSelector(state => state.filter.filters['product_list'])
    const [previewFilters, setPreviewFilters] = useState<{
        category_list: IProductCategory[],
        brand_list: IProductBrand[],
        offer_list: IOffer[],
    }>({
        category_list: [],
        brand_list: [],
        offer_list: [],
    });
    const {
        data: filters_data,
    } = productApi.useGetProductFiltersQuery(undefined);
    const [fetchProductList] = productApi.useLazyGetProductListQuery();

    const appliedFiltersDict = useMemo(() => {
        function normalize_fn<T>(data: Array<T & {
            id: string;
        }>) {
            const normalized: {
                ids: string[];
                entries: Record<string, T>;
            } = {
                ids: [],
                entries: {},
            }
            data.forEach(item => {
                normalized.ids.push(item.id)
                normalized.entries[item.id] = item;
            })
            return normalized;
        }

        return {
            category_list: normalize_fn<IProductCategory>(appliedFilters['category_list']!.data),
            brand_list: normalize_fn<IProductBrand>(appliedFilters['brand_list']!.data),
            price: appliedFilters['price']!.data,
        };
    }, [appliedFilters])

    useEffect(() => {
        if (filters_data) {
            setPreviewFilters(() => {
                return ({
                    price: {
                        from: 0,
                        to: 500,
                    },
                    category_list: filters_data.categories,
                    brand_list: filters_data.brands,
                    offer_list: filters_data.offers,
                });
            });
        }
    }, [filters_data]);

    const handleCategories = (_: ChangeEvent<HTMLInputElement>, item: IProductCategory) => {
        const def_data = {...appliedFiltersDict.category_list,}
        if (!def_data.ids.includes(item.id)) {
            def_data.ids.push(item.id)
            def_data.entries[item.id] = item;
        } else {
            def_data.ids = def_data.ids.filter(def_data_item => def_data_item !== item.id)
            delete def_data.entries[item.id]
        }
        dispatch(setAppliedFilters({
            product_list: {
                filters: {
                    category_list: {
                        type: "select",
                        multiple: true,
                        data: Object.values(def_data.entries),
                    },
                }
            }
        }))
    }
    const handleBrands = (_: ChangeEvent<HTMLInputElement>, item: IProductBrand) => {
        const def_data = {...appliedFiltersDict.brand_list,}
        if (!def_data.ids.includes(item.id)) {
            def_data.ids.push(item.id)
            def_data.entries[item.id] = item;
        } else {
            def_data.ids = def_data.ids.filter(def_data_item => def_data_item !== item.id)
            delete def_data.entries[item.id]
        }
        dispatch(setAppliedFilters({
            product_list: {
                filters: {
                    brand_list: {
                        type: "select",
                        multiple: true,
                        data: Object.values(def_data.entries),
                    },
                }
            }
        }))
    }
    const handlePriceRange = (value: number[]) => {
        dispatch(setAppliedFilters({
            product_list: {
                filters: {
                    price: {
                        type: "range",
                        data: {
                            from: value[0],
                            to: value[1],
                        }
                    }
                }
            }
        }))
    }
    const handleDiscountGte = (e: ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        dispatch(setAppliedFilters({
            product_list: {
                filters: {
                    discount__gte: {
                        type: "text",
                        data: value,
                    },
                }
            }
        }))
    }
    const handleClearFilters = () => {
        dispatch(clearAppliedFilters(['product_list']))
    }
    const handleSubmitFilters = () => {
        fetchProductList(undefined);
    }

    return (
        <Box w={["100%", "100%", "320px"]} p="2" bgColor={"gray.100"}>
            <Text p="20px" border="1px solid gray.100">Filter Products</Text>
            <Accordion p="20px" bgColor="white">
                <AccordionItem>
                    <AccordionButton my="10px" fontWeight="600" color="brand.900">CATEGORIES</AccordionButton>
                    <AccordionPanel>
                        <Box>
                            {
                                previewFilters.category_list.map((item) => {
                                    return (
                                        <Checkbox key={item.id} p="2"
                                                  value={item.id}
                                                  colorScheme="green"
                                                  onChange={(e) => handleCategories(e, item)}
                                                  isChecked={appliedFiltersDict.category_list.ids.includes(item.id)}
                                        > {item.name}</Checkbox>
                                    )
                                })
                            }
                        </Box>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton my="10px" fontWeight="600" color="brand.900">BRANDS</AccordionButton>
                    <AccordionPanel>
                        <Box>
                            {
                                previewFilters.brand_list.map((item,) => {
                                    return (
                                        <Checkbox key={item.id} p="2"
                                                  value={item.id}
                                                  colorScheme="green"
                                                  onChange={(e) => handleBrands(e, item)}
                                                  checked={appliedFiltersDict.brand_list.ids.includes(item.id)}
                                        > {item.name}</Checkbox>
                                    )
                                })
                            }
                        </Box>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton my="10px" fontWeight="600" color="brand.900">PRICE</AccordionButton>
                    <AccordionPanel>
                        {
                            appliedFiltersDict.price ? (
                                <>
                                    <RangeSlider
                                        max={500}
                                        aria-label={["green"]}
                                        colorScheme="green"
                                        defaultValue={[appliedFiltersDict.price.from, appliedFiltersDict.price.to]}
                                        onChangeEnd={handlePriceRange}
                                    >
                                        <RangeSliderTrack>
                                            <RangeSliderFilledTrack/>
                                        </RangeSliderTrack>
                                        <RangeSliderThumb index={0}/>
                                        <RangeSliderThumb index={1}/>
                                    </RangeSlider>
                                    <Flex justify="space-between" w="100%">
                                        <Text>Min: {appliedFiltersDict.price.from}</Text>
                                        <Text>Max: {appliedFiltersDict.price.to}</Text>
                                    </Flex>
                                </>
                            ) : (
                                <Skeleton/>
                            )
                        }
                    </AccordionPanel>
                </AccordionItem>


                <AccordionItem>
                    <AccordionButton my="10px" fontWeight="600" color="brand.900">DISCOUNT PERCENTAGE</AccordionButton>
                    <AccordionPanel>
                        <Select onChange={handleDiscountGte}>
                            <option>-----</option>
                            {
                                [10, 20, 30, 40, 50].map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}% or more</option>
                                    )
                                })
                            }
                        </Select>
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>

            <Flex p="20px">
                <Button bgColor="brand.900" color="white" flex="1" me="2" borderRadius="0"
                        onClick={handleSubmitFilters}>Apply filters</Button>
                <Button bgColor="gray.100" onClick={handleClearFilters}>Clear</Button>
            </Flex>
        </Box>
    )
}

export default ShopFilter;