import { useEffect, useState } from "react"
import { VStack, Box, Text } from "@chakra-ui/react"

const DateComponent = () => {
  const [current, setCurrent] = useState(new Date())

  useEffect(() => {
    const currentTime = setInterval(() => {
      setCurrent(new Date())
    }, 1000)

    return () => {
      clearInterval(currentTime)
    }
  }, [])

  return (
    <Box>
      <VStack spacing={2} align="left">
        <Text fontSize="2xl">
          {current.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Text>
        <Text>{current.toLocaleTimeString("it-IT")}</Text>
      </VStack>
    </Box>
  )
}
export default DateComponent
