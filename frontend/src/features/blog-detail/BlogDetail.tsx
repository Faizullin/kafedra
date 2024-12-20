import {Box} from "@chakra-ui/react";
import {FC} from "react";
import {Navigate, useParams} from "react-router-dom";

interface IBlogDetailProps {
}

const BlogDetail: FC<IBlogDetailProps> = () => {
    // const intl = useIntl();
    const {slug} = useParams();
    // const navigate = useNavigate();
    // const {data: product_data, isFetching} = productApi.useGetProductQuery({slug});

    if (!slug) {
        return <Navigate to="/blogs"/>
    }

    // const navigateToMenu = () => {
    //     navigate("/blogs")
    // }


    return (
        <Box>
        </Box>
    );
};

export default BlogDetail;
