import { Flex, Image } from "@chakra-ui/react";
import { HSeparator } from "@/components/separator";

import Logo from "@/assets/images/logo.svg";

export function SidebarBrand() {
  return (
    <Flex alignItems="center" flexDirection="column">
      <Image width={"90px"} src={Logo} alt="logo_bg_white" mb={5} />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
