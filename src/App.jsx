import { AppContext } from "./utils/context"
import { useAppReducer } from "./utils/reducer"
import DateComponent from "./components/Date"
import Form from "./components/Form"
import List from "./components/List"
import { Center, Box, VStack } from "@chakra-ui/react"

function App() {
  const { state, dispatch } = useAppReducer()

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Center minH="100vh" p="5">
        <Box p="5" maxW="90vw" borderWidth="1px">
          <VStack spacing={3} align="auto">
            <DateComponent />
            <Form />
            <List />
          </VStack>
        </Box>
      </Center>
    </AppContext.Provider>
  )
}

export default App
