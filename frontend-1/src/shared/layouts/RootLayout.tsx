import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/core/hooks/redux";
import {checkAuth} from "@/core/redux/reducers/authSlice";
import {Flex, Spinner} from "@chakra-ui/react";
import {useEffect} from "react";

// const DestinationGuideModalComponent = NiceModal.create(
//     (props: { isLoading: boolean; destinationItemObj: IDestinationGuide }) => {
//         const modal = useModal();
//         return (
//             <DestinationGuideModal
//                 isLoading={props.isLoading}
//                 isOpen={modal.visible}
//                 onDisclosure={function (state: boolean): void {
//                     if (!state) {
//                         modal.hide();
//                     }
//                 }}
//                 destinationItemObj={props.destinationItemObj}
//             />
//         );
//     }
// );
// const TourPackageModalComponent = NiceModal.create(
//     (props: { isLoading: boolean; tourItemObj: ITourPackage }) => {
//         const modal = useModal();
//         return (
//             <TourPackageModal
//                 isLoading={props.isLoading}
//                 isOpen={modal.visible}
//                 onDisclosure={function (state: boolean): void {
//                     if (!state) {
//                         modal.hide();
//                     }
//                 }}
//                 tourItemObj={props.tourItemObj}
//                 onDestinationClick={function (itemObj: IDestinationGuide): void {
//                     NiceModal.show("destination-guide-modal", {
//                         destinationItemObj: itemObj,
//                         isLoading: false,
//                     });
//                 }}
//             />
//         );
//     }
// );
// const CustomerReviewModalComponent = NiceModal.create(
//     (props: { isLoading: boolean; reviewItemObj: ICustomerReview }) => {
//         const modal = useModal();
//         return (
//             <CustomerReviewModal
//                 isLoading={props.isLoading}
//                 isOpen={modal.visible}
//                 onDisclosure={function (state: boolean): void {
//                     if (!state) {
//                         modal.hide();
//                     }
//                 }}
//                 reviewItemObj={props.reviewItemObj}
//             />
//         );
//     }
// );
// NiceModal.register("destination-guide-modal", DestinationGuideModalComponent);
// NiceModal.register("tour-package-modal", TourPackageModalComponent);
// NiceModal.register("customer-review-modal", CustomerReviewModalComponent);

export default function RootLayout() {
    const dispatch = useAppDispatch()
    const {loading, isAuthenticated, user} = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(checkAuth());
        }
    }, [dispatch, isAuthenticated, user]);
    return (
        <Flex h="auto" position="relative">
            {loading.detail ? (
                <Flex w="100%" justify="center" align="center" height="100vh" width="full">
                    <Spinner size="xl" color="ui.main"/>
                </Flex>
            ) : (
                <Outlet/>
            )}
        </Flex>
    );
}
