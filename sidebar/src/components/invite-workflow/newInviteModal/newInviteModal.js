import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ACTIONS } from "../../../App"
import useClickOutside from "../customHooks/useClickOutside"
import cancel from "./assets/cancel.svg"
import { sendInviteAPI } from "./new-invite.utils"const Container = styled.div`
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
    z-index: 99999999999;
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
    width: 600px;
    background-color: #fff;
    border-radius: 10px;

    @media (max-width: 768px){
      width: 80%;
    }
  }

  &.invite-modal-header {
    display: flex !important;
    justify-content: space-between !important;
    margin:1em 0.65em;
  }

  &.invite-modal-textarea{
    width:100%;
    display: flex !important;
    justify-content:center;
    align-items:center;
    margin:1em 0;
  }
  &.invite-modal-btnContainer {
    display: block !important;
    margin:1em 0.65em;
  }

  &.invite-modal-sendBtn {
    display: flex;
    justify-content: flex-end;
  }

  &.invite-modal-textarea,
  &.invite-modal-sendBtn {
    width: 100%;
  }
`
const Text = styled.h3`
  font-weight: 800 !important;
  padding: 0 !important;
  margin: 10px 0;
  font-size:2rem;
  color:black;
`

const TextArea = styled.textarea`
  border: 1px solid black !important;
  min-height: 8em;
  width: 85%;
  padding: 15px 20px;

  &:focus {
    color: black !important;
  }
`

const Label = styled.label``

const Image = styled.img``

const Button = styled.button`
  outline: none;
  background: transparent;
  border:none;

  &.invite-sendBtn {
    float:right;
    color: white !important;
    background-color: #00b87c;
    color: #ffffff;
    font-size:20px;
    border-radius: 3px;
    padding: 10px 15px;
    border: none;

    &:hover {
      transform: scale(1.1)
    }
  }
`


function NewInviteModal(props) {
  const [emailField, setEmailField] = useState("")
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

  const isLoading= (visibililty) =>{
  props.dispatch({
  type: ACTIONS.IS_LOADING,
  payload: visibililty
})
  }
  const isOpen = (visibililty) => {
    isLoading(false)
    props.dispatch({
      type: ACTIONS.IS_OPEN,
      payload: visibililty
    })
  }

  const handleSendInvite = async () => {
    handleCloseInviteModal()
    isLoading(true)
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailField.length > 5) {
      try {
        const response = await sendInviteAPI(
          emailField.trim().replaceAll(" ", "").split(",")
        )
        if (response.status === 200) {
          setEmailField("")
          handleCloseInviteModal()
          modalToShow("success")
          
          isLoading(false)
          isOpen(false)
        }
      } catch (err) {
        setEmailField("")
        handleCloseInviteModal()
        modalToShow("error")
        isLoading(false)
        isOpen(false)
      }
    }
    else {
      setEmailField("")
      handleCloseInviteModal()
      showMessage("Invalid Email")
      modalToShow("error")
      isOpen(false)
    }
  }

  useEffect(() => {
    setShowInviteModal(true)
  }, [props.state.inviteModalType])


  return (
    showInviteModal && props.state.inviteModalType === "show-invite-modal" && (
      <Container className="invite-modal-main">
        <Container className="invite-modal-innerContainer" ref={inviteModalNode}>
          <Container className="invite-modal-header">
            <Text>Invite people to HNGi8</Text>
            <Button onClick={handleCloseInviteModal}>
              <Image src={cancel}></Image>
            </Button>
          </Container>

          <Container className="invite-modal-textarea">
            <Label for="emails"></Label>
            <TextArea
              placeholder="name@gmail.com"
              name="emails"
              id="emails"
              value={emailField}
              onChange={evt => setEmailField(evt.target.value)}
              required
            ></TextArea>
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
