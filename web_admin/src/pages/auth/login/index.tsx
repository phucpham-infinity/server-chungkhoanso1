import React from "react";
import Logo from "@/assets/images/logo.svg";
import HomeBg from "@/assets/images/home-bg.avif";

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";

import useAuthBloc from "@/pages/auth/auth.bloc";

export default function LoginPage() {
  const { handleLogin } = useAuthBloc();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Stack w={"100vw"} minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Image w={"100px"} src={Logo} />
          <Heading fontSize={"2xl"}>Sign in to your account 2023</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"blue.500"}>Forgot password?</Text>
            </Stack>
            <Button
              isLoading={handleLogin.isLoading}
              onClick={() => {
                handleLogin.mutate({ email, password });
              }}
              colorScheme={"blue"}
              variant={"solid"}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={HomeBg} />
      </Flex>
    </Stack>
  );
}
