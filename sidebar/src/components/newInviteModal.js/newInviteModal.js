import React from "react"
import styled from "styled-components"
//import cancel from "./assets/cancel.svg"

const Container = styled.div`
  &.invite-modal-main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: grey !important;
    z-index: 2;
  }

  &.invite-modal-innerContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 50%;
    display: flex;
    margin-bottom: 1em;
    background: white !important;
  }

  &.invite-modal-header {
    display: flex;
  }

  &.invite-modal-sendBtn {
    display: flex;
    justify-content: flex-end;
  }
`
const Text = styled.h3``

const TextArea = styled.textarea``

const Button = styled.button``

function NewInviteModal() {
  return (
    <Container className="invite-modal-main">
      <Container className="invite-modal-innerContainer">
        <Container className="invite-modal-header">
          <Text>Invite people to HNGi8</Text>
          <Button></Button>
        </Container>

        <Container>
          <TextArea placeholder="name@gmail.com"></TextArea>
        </Container>

        <Container className="invite-modal-sendBtn">
          <Button>Send</Button>
        </Container>
      </Container>
    </Container>
  )
}
export default NewInviteModal
