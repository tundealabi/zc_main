import Sidebar from "./sidebar.component"
import { useEffect, useReducer } from "react"
import SkeletonLoader from "./components/SkeletonLoader"
import { fetchUser } from "./utils/fetchUserDetails"
import NewInviteModal from "./components/invite-workflow/newInviteModal/newInviteModal"
import InviteLoaderModal from "./components/invite-workflow/invite-loader/Loader"
import InviteResponseModal from "./components/invite-workflow/response-modal/responseModal"

export const ACTIONS = {
  ADD_USER_INFO: "add-user-info",
  ADD_ITEM: "add",
  UPDATE_PLUGINS: "update",
  ADD_ORGANIZATION: "add-org-email",
  INVITE_MODAL_TYPE: "select-invite-modal"
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      //Add items to sidebar
      var sidebar_data = action.payload
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          ...sidebar_data
        }
      }
    case ACTIONS.UPDATE_ITEM:
      //Update sidebar
      var sidebar_update = action.payload
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          ...sidebar_update
        }
      }

    case ACTIONS.ADD_USER_INFO:
      //Add user info
      var userInfo = action.payload
      return {
        ...state,
        user: {
          ...state.user,
          ...userInfo
        }
      }
    case ACTIONS.ADD_ORGANIZATION:
      //set organization info
      var org_info = action.payload
      return {
        ...state,
        organization_info: {
          ...state.organization_info,
          ...org_info
        }
      }
    case ACTIONS.INVITE_MODAL_TYPE:
      //set invite modal
      return {
        ...state,
        inviteModalType: action.payload
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    //Load user related information when component mounts
    fetchUser(dispatch)
  }, [])

  return !state.sidebar ? (
    <SkeletonLoader />
  ) : (
    <>
      <Sidebar state={state} dispatch={dispatch} />
      <NewInviteModal state={state} dispatch={dispatch} />
      <InviteLoaderModal state={state} dispatch={dispatch} />
      <InviteResponseModal state={state} dispatch={dispatch} />
    </>
  )
}
