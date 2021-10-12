import React, { useState } from "react"
import styled from "styled-components"
import InviteUser from "../../../control/src/pages/invite-workflow/invite/inviteUser"

const Container = styled.div``
const Text = styled.p``

function NewModalToTestInvite() {
  const [inviteModal, setInviteModal] = useState(false)

  const toggleInviteModal = () => {
    setInviteModal(!inviteModal)
  }

  return (
    <Container>
      <Container onClick={toggleInviteModal}>
        <Text>Invite people to HNGi8</Text>
      </Container>
      {inviteModal && <InviteUser />}
    </Container>
  )
}

export default NewModalToTestInvite
