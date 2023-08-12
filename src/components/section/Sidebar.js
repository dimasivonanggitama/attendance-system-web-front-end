import { Box, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { TbBoxSeam, TbCalculator, TbCategory, TbReportAnalytics, TbUsers } from 'react-icons/tb';

const Sidebar = (props) => {
    let productButtonBold, categoryButtonBold, userManagementButtonBold, reportButtonBold = "";
    let productButtonColor, categoryButtonColor, userManagementButtonColor, reportButtonColor = "transparent";
    if (props.sidebar === "product") {
        productButtonBold = "b";
        categoryButtonBold = userManagementButtonBold = reportButtonBold = "";
        productButtonColor = "red.200";
        categoryButtonColor = userManagementButtonColor = reportButtonColor = "transparent";
    } else if (props.sidebar === "category") {
        categoryButtonBold = "b";
        productButtonBold = userManagementButtonBold = reportButtonBold = "";
        categoryButtonColor = "red.200";
        productButtonColor = userManagementButtonColor = reportButtonColor = "transparent";
    } else if (props.sidebar === "usermanagement") {
        userManagementButtonBold = "b";
        productButtonBold = categoryButtonBold = reportButtonBold = "";
        userManagementButtonColor = "red.200";
        productButtonColor = categoryButtonColor = reportButtonColor = "transparent";
    } else if (props.sidebar === "report") {
        reportButtonBold = "b";
        productButtonBold = categoryButtonBold = userManagementButtonBold = "";
        reportButtonColor = "red.200";
        productButtonColor = categoryButtonColor = userManagementButtonColor = "transparent";
    }
    
    return (
        // <Drawer placement={"left"} /*onClose={onClose}*/ isOpen={true}>
        //     <DrawerOverlay />
        //     <DrawerContent>
        //         <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader>
        //         <DrawerBody>
        //             <p>Some contents...</p>
        //             <p>Some contents...</p>
        //             <p>Some contents...</p>
        //         </DrawerBody>
        //     </DrawerContent>
        // </Drawer>
        <Box height="90vh" width={["", "20%"]} boxShadow={'md'} paddingX={5}>
            {
                (props.role === "kasir")? <>
                    <Box marginTop={5} borderTop={"1px"}>
                        <Text as="b">Kasir</Text>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} paddingY={2} bgColor={"orange.200"} borderRadius={5} _hover={{background: "#FEEBC8"}}>
                        <Box paddingRight={5}>
                            <TbCalculator size={30} />
                        </Box>
                        <Text as="b" fontSize={"xl"}>Kasir</Text>
                    </Box>
                </> : <></>
            }
            {
                (props.role === "admin")? <>
                    <Box marginTop={5} borderTop={"1px"}>
                        <Text as="b">Admin</Text>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} paddingY={2} bgColor={productButtonColor} borderRadius={5} _hover={{background: "#FED9D9"}} as={productButtonBold}>
                        <Box paddingRight={5}>
                            <TbBoxSeam size={30} />
                        </Box>
                        <Text fontSize={"lg"}>Produk</Text>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} paddingY={2} bgColor={categoryButtonColor} borderRadius={5} _hover={{background: "#FED9D9"}} as={categoryButtonBold}>
                        <Box paddingRight={5}>
                            <TbCategory size={30} />
                        </Box>
                        <Text fontSize={"lg"}>Kategori</Text>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} paddingY={2} bgColor={userManagementButtonColor} borderRadius={5} _hover={{background: "#FED9D9"}} as={userManagementButtonBold}>
                        <Box paddingRight={5}>
                            <TbUsers size={30} />
                        </Box>
                        <Text fontSize={"lg"}>User Manajemen</Text>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} paddingY={2} bgColor={reportButtonColor} borderRadius={5} _hover={{background: "#FED7D7"}} as={reportButtonBold}>
                        <Box paddingRight={5}>
                            <TbReportAnalytics size={30} />
                        </Box>
                        <Text fontSize={"lg"}>Laporan Penjualan</Text>
                    </Box> 
                </> : <></>
            }
        </Box>
    )
}

export default Sidebar