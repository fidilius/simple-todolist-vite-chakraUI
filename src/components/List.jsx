import { useState, useEffect } from "react"
import { useAppContext } from "../utils/context"
import {
  Box,
  Button,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react"

const Label = ({ startTime, endTime }) => {
  const [current, setCurrent] = useState(new Date())

  const oneMinute = 60000

  useEffect(() => {
    const intervalPerMin = setInterval(() => {
      setCurrent(new Date())
    }, oneMinute)

    return () => clearInterval(intervalPerMin)
  }, [])

  const currentTime = current.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  })

  // default (passed)
  let status = "has passed"
  let label = "s"

  if (currentTime < startTime) {
    status = "incoming"
    label = "b"
  }
  if (currentTime > startTime && currentTime < endTime) {
    status = "ongoing"
    label = "mark"
  }

  return <Text as={label}>{status}</Text>
}

const List = () => {
  const { state, dispatch } = useAppContext()

  const handleRemove = (todo) => {
    dispatch({ type: "REMOVE_TODO", payload: { todo } })
  }

  return (
    <>
      {state.todoItems &&
        state.todoItems.map((todoItem) => {
          const { todo, startTime, endTime } = todoItem

          return (
            <Card key={todo}>
              <CardBody>
                <Box>
                  <Stack spacing={2} alignItems="center">
                    <Heading size="md" textTransform="capitalize">
                      {todo}
                    </Heading>
                    <Text>
                      {startTime} {endTime && ` - ${endTime}`}
                    </Text>
                    <Label startTime={startTime} endTime={endTime} />
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleRemove(todo)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              </CardBody>
            </Card>
          )
        })}
    </>
  )
}
export default List
