import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { ACTIONS } from "../../../App"
import useClickOutside from "../customHooks/useClickOutside"
import cancel from "./assets/cancel.svg"
import { sendInviteAPI } from "./new-invite.utils"

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");

  display: block !important;

  &.invite-modal-main {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.invite-modal-innerContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.65em 1em;
    display: flex;
    margin-bottom: 1em;
    background: white !important;
    width: 50%;
    background-color: #fff;
    border-radius: 10px;

    @media (max-width: 600px) {
      width: 95%;
    }
  }

  &.invite-modal-header {
    display: flex !important;
    justify-content: space-between !important;
    margin: 1em 0.65em;
  }

  &.invite-modal-textarea {
    width: 100%;
    display: flex !important;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 1em 0;
  }

  &.invite-modal-btnContainer {
    display: block !important;
    margin: 1em 0.65em;
  }

  &.invite-modal-sendBtn {
    display: flex;
    justify-content: flex-end;
  }

  &.invite-modal-textarea,
  &.invite-modal-sendBtn {
    width: 100%;
  }

  &.tag-item {
    background-color: #00b87c1a;
    font-size: 14px;
    border-radius: 30px;
    height: 30px;
    padding: 0 4px 0 1rem;
    display: inline-flex;
    flex-direction: row;
    align-self: flex-start;
    margin: 0 0.3rem 0.3rem 0;
  }
`
const Text = styled.h3`
  font-weight: 700 !important;
  padding: 0 !important;
  margin: 10px 0;
  font-size: 2rem;
  font-family: 'Lato', sans-serif;
  color: black;
`

// const TextArea = styled.textarea`
//   border: 1px solid black !important;
//   min-height: 8em;
//   width: 85%;
//   padding: 15px 20px;
//   resize: none;

//   &:focus {
//     color: black !important;
//   }
// `

const Input = styled.input`
  border: 1px solid green !important;
  min-height: 8em;
  width: 85%;
  padding: 15px 20px;
  resize: none;

  &:focus {
    color: black !important;
  }
`

const Label = styled.label`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  margin: 10px 20px;
  align-self: flex-start;
`

const Image = styled.img

const Button = styled.button`
  outline: none;
  background: transparent;
  border: none;

  &.invite-sendBtn {
    float: right;
    color: white !important;
    background-color: #00b87c;
    font-size: 17px;
    font-family: 'Lato', sans-serif;
    border-radius: 3px;
    padding: 10px 18px;
    border: none;
    margin: 15px 0;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  &.tag-button {
    background-color: #00b87c1a;
    width: 25px;
    height: 30px;
    border-radius: 30px;
    border: none;
    cursor: pointer;
    font: inherit;
    margin-left: 10px;
    font-weight: bold;
    padding: 0;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`

function NewInviteModal(props) {
  // const [emailField, setEmailField] = useState("")
  const input = useRef(null);
  const [state, setState] = useState({
    items: [],
    value: "",
    error: null
  });
  const [showInviteModal, setShowInviteModal] = useState(true)
  const handleCloseInviteModal = () => {
    props.dispatch({
      type: ACTIONS.INVITE_MODAL_TYPE,
      payload: ""
    })
  }

  //Dom Node for the invite modal
  const inviteModalNode = useClickOutside(() => {
    setShowInviteModal(false)
    handleCloseInviteModal()
  })

  const modalToShow = status => {
    props.dispatch({
      type: ACTIONS.MODAL_TO_SHOW,
      payload: status
    })
  }

  const showMessage = message => {
    props.dispatch({
      type: ACTIONS.SHOW_MESSAGE,
      payload: message
    })
  }

  const isLoading = visibililty => {
    props.dispatch({
      type: ACTIONS.IS_LOADING,
      payload: visibililty
    })
  }
  const isOpen = visibililty => {
    isLoading(false)
    props.dispatch({
      type: ACTIONS.IS_OPEN,
      payload: visibililty
    })
  }

  const handleDelete = (item) => {
    setState({
      ...state,
      items: state.items.filter((i) => i !== item)
    });
  };

  const handleKeyUp = (evt) => {
    setState({
      ...state,
      value: evt.target.value
    });
    if (state.value.length > 0) a(evt);
  };

  const a = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      let value = state.value.trim();

      if (value && isValid(value)) {
        setState({
          ...state,
          items: [...state.items, evt.target.value],
          value: ""
        });
        input.current.value = "";
      }
    }
  };

  const handleChange = (evt) => {
    setState({
      ...state,
      value: evt.target.value,
      error: null
    });
  };

  const handlePaste = (evt) => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\\.-]+@[\w\d\\.-]+\.[\w\d\\.-]+/g);

    if (emails) {
      let toBeAdded = emails.filter((email) => !isInList(email));

      setState({
        ...state,
        items: [...state.items, ...toBeAdded]
      });
    }
  };

  function isValid(email) {
    let error = null;

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      setState({ ...state, error });

      return false;
    }

    return true;
  }

  function isInList(email) {
    return state.items.includes(email);
  }

  function isEmail(email) {
    return /[\w\d\\.-]+@[\w\d\\.-]+\.[\w\d\\.-]+/.test(email);
  }

  const handleSendInvite = async () => {
    handleCloseInviteModal()
    isLoading(true)
    // let emailsValidated = true
    
    // const re =
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // const splitEmails = emailField.trim().replaceAll(" ", "").split(",")
    // splitEmails.forEach(email => {
    //   if (!re.test(email)) {
    //     emailsValidated = false
    //   }
    // })
    try {
      const response = await sendInviteAPI(
        state.items
      )
      if (response.status === 200) {
        // setEmailField("")
        setState({
          items: [], 
          value: "",
          error: null
        })
        handleCloseInviteModal()
        modalToShow("success")

        isLoading(false)
        isOpen(false)
      }
    } catch (err) {
      // setEmailField("")
      handleCloseInviteModal()
      modalToShow("error")
      isLoading(false)
      isOpen(false)
    }
    // if (emailsValidated) {
    // } else {
    //   // setEmailField("")
    //   handleCloseInviteModal()
    //   showMessage("Invalid Email")
    //   modalToShow("error")
    //   isOpen(false)
    // }
  }

  useEffect(() => {
    setShowInviteModal(true)
  }, [props.state.inviteModalType])

  return (
    showInviteModal &&
    props.state.inviteModalType === "show-invite-modal" && (
      <Container className="invite-modal-main">
        <Container
          className="invite-modal-innerContainer"
          ref={inviteModalNode}
        >
          <Container className="invite-modal-header">
            <Text>Invite People to Zurichat</Text>
            <Button onClick={handleCloseInviteModal}>
              <Image src={cancel}></Image>
            </Button>
          </Container>

          <Container className="invite-modal-textarea">
            <Label for="emails">To :</Label>

            {state.items.map(item => (
              <Container className="tag-item" key={item}>
                {item}
                <Button
                  type="button"
                  className="tag-button"
                  onClick={() => handleDelete(item)}
                >
                  &times;
                </Button>
              </Container>
            ))}

            <Input
              ref={input}
              className={"input " + (state.error && " has-error")}
              // value={state.value}
              placeholder="Type or paste email addresses and press `Enter`..."
              onKeyUp={handleKeyUp}
              onChange={handleChange}
              onPaste={handlePaste}
            />

            {state.error && <p className="error">{state.error}</p>}
            {/* <TextArea
              placeholder="name@gmail.com"
              name="emails"
              id="emails"
              // value={emailField}
              onChange={evt => {
                setEmailList()
              }}
              required
            ></TextArea> */}
          </Container>

          <Container className="invite-modal-sendBtn">
            <Button className="invite-sendBtn" onClick={handleSendInvite}>
              Send
            </Button>
          </Container>
        </Container>
      </Container>
    )
  )
}

export default NewInviteModal
