import {Flex, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {useAppSelector} from "@/core/hooks/redux.ts";
import CLink from "@/shared/components/common/clink/CLink.tsx";
import {ReactNode, useEffect, useState} from "react";
import {notificationApi} from "@/core/redux/api/notification/notification.api.ts";

const Dashboard = () => {
    const [currentTabKey, setCurrentTabKey] = useState<number>(1);
    const {user} = useAppSelector(state => state.auth)
    const [fetchData] = notificationApi.useLazyGetNotificationListQuery();

    useEffect(() => {
        if(currentTabKey === 3') {

        }
    }, [currentTabKey]);

    return (
        <Flex px={[null, "20px", "5%", "10%"]} py="5%" minH={"90vh"}>
            <Tabs>
                <TabList px="15px" mx={["auto", "5px"]}>
                    {
                        ["Dashboard", "Orders", "Account", "Notifications"].map((tab, i) => (
                            <Tab key={i}>{tab}</Tab>
                        ))
                    }
                </TabList>

                <TabPanels>
                    <TabPanel tabIndex={1}>
                        <p>Welcome: {user?.email}</p>
                    </TabPanel>

                    <TabPanel tabIndex={2}>
                        <p>You have not placed any order. Visit the <CLink color={"green.500"}
                                                                           to="/shop">shop</CLink> to add item to cart
                            and place order.</p>
                    </TabPanel>

                    <TabPanel tabIndex={3}>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}

export default Dashboard;