import React from "react"
import styled from "styled-components"
import cancel from "./assets/cancel.svg"

const Container = styled.div`
  display: block !important;

  &.invite-modal-main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: grey !important;
    z-index: 10;
  }

  &.invite-modal-innerContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 30%;
    padding: 1em;
    display: flex;
    margin-bottom: 1em;
    background: white !important;
  }

  &.invite-modal-header {
    display: flex !important;
    justify-content: space-between !important;
  }

  &.invite-modal-textarea,
  &.invite-modal-btnContainer {
    display: block !important;
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
  color: black !important;
  font-weight: 800 !important;
  padding: 0 !important;
`

const TextArea = styled.textarea`
  border: 1px solid black !important;
  min-height: 8em;
  width: 100%;
  padding: 10px 0;
`

const Image = styled.img``

const Button = styled.button`
  outline: none;
  background: transparent;

  &.invite-sendBtn {
    display: flex !important;
    justify-content: flex-end;
    background: #00b87c !important;
    color: white !important;
  }
`

function NewInviteModal({ openModal, setOpenModal }) {
  return (
    <Container className="invite-modal-main">
      <Container className="invite-modal-innerContainer">
        <Container className="invite-modal-header">
          <Text>Invite people to HNGi8</Text>
          <Button onClick={() => setOpenModal(!openModal)}>
            <Image src={cancel}></Image>
          </Button>
        </Container>

        <Container className="invite-modal-textarea">
          <TextArea placeholder="name@gmail.com"></TextArea>
        </Container>

        <Container className="invite-modal-sendBtn">
          <Button className="invite-sendBtn">Send</Button>
        </Container>
      </Container>
    </Container>
  )
}

export default NewInviteModal
