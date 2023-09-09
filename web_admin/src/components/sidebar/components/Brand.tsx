import { Flex, Image } from "@chakra-ui/react";
import { HSeparator } from "@/components/separator";

export function SidebarBrand() {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Image
        width={"90px"}
        src="http://storage.chungkhoanso1.vn/app/images/logo_bg_white.png"
        alt="logo_bg_white"
        mb={5}
      />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
