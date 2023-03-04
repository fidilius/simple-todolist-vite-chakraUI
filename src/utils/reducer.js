import { useReducer } from "react"

const reducer = (state, action) => {
  const { type } = action
  const payload = action?.payload

  if (type === "ADD_TODO") {
    if (!state.todoItems) {
      return { ...state, todoItems: [payload.todoItem] }
    }

    return { ...state, todoItems: [...state.todoItems, payload.todoItem] }
  }

  if (type === "REMOVE_TODO") {
    const newTodoItems = state.todoItems.filter(
      (item) => item.todo !== payload.todo
    )

    return { ...state, todoItems: newTodoItems }
  }

  throw new Error(`No matching "${type}" - action type`)
}

const initialValue = {}

export const useAppReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  return { state, dispatch }
}
