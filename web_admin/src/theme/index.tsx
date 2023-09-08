import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import { ChakraProvider } from '@chakra-ui/react'

export const theme = extendTheme({ colors })


const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChakraProvider>
            {children}
        </ChakraProvider>
    )
}

export default ThemeProvider