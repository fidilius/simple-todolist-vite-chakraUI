import { useFormik } from "formik"
import * as Yup from "yup"
import moment from "moment"
import { useAppContext } from "../utils/context"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  HStack,
  InputLeftAddon,
  InputGroup,
  Center,
  Divider,
  Button,
} from "@chakra-ui/react"

const FormComponent = () => {
  const { dispatch } = useAppContext()

  // formik
  const formik = useFormik({
    initialValues: {
      todo: "",
      start: "",
      end: "",
    },
    validationSchema: Yup.object({
      todo: Yup.string().required("To do cannot be empty"),
      start: Yup.string().required("start time cannot be empty"),
      end: Yup.string().test(
        "is-greater",
        "end time should be greater",
        function (value) {
          const { start } = formik.values
          if (value === undefined || value === "") return true
          return moment(value, "HH:mm").isSameOrAfter(moment(start, "HH:mm"))
        }
      ),
    }),
    onSubmit: (value, { resetForm }) => {
      const { todo, start, end } = value
      dispatch({
        type: "ADD_TODO",
        payload: { todoItem: { todo, startTime: start, endTime: end } },
      })
      resetForm()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <FormControl isInvalid={formik.touched.todo && formik.errors.todo}>
          <FormLabel>To do:</FormLabel>
          <Input
            type="text"
            name="todo"
            value={formik.values.todo}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.todo && formik.errors.todo && (
            <FormErrorMessage>{formik.errors.todo}</FormErrorMessage>
          )}
        </FormControl>
        <HStack alignItems="top">
          <FormControl isInvalid={formik.touched.start && formik.errors.start}>
            {/* <FormLabel>Start</FormLabel> */}
            <InputGroup size="sm">
              <InputLeftAddon children="Start" width="60px" />
              <Input
                type="time"
                w="200px"
                name="start"
                value={formik.values.start}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.start && formik.errors.start && (
              <FormErrorMessage>{formik.errors.start}</FormErrorMessage>
            )}
          </FormControl>
          <Center height="40px">
            <Divider orientation="vertical" />
          </Center>
          <FormControl isInvalid={formik.touched.end && formik.errors.end}>
            {/* <FormLabel>End</FormLabel> */}
            <InputGroup size="sm">
              <InputLeftAddon children="End" width="60px" />
              <Input
                type="time"
                w="200px"
                name="end"
                value={formik.values.end}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.end && formik.errors.end && (
              <FormErrorMessage>{formik.errors.end}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>

        <Button type="submit" colorScheme="teal">
          Add Todo
        </Button>
      </Stack>
    </form>
  )
}
export default FormComponent
