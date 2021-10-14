import React, { useState } from "react"
import styles from "../styles/Sidebar.module.css"
import addIcon from "../assets/icons/add-icon.svg"
import { ACTIONS } from "../App"

export default function Invite(props) {
  //Invite modal
  const openInviteModal = () => {
    props.dispatch({
      type: ACTIONS.INVITE_MODAL_TYPE,
      payload: "show-invite-modal"
    })
  }

  return (
    <div className={`row mt-2 ${styles.sb__item}`}>
      {props.state.user && props.state.user[0].role === ("owner" || "admin") ? (
        <div
          className={`col-12 ps-3 d-flex align-items-center ${styles.sb__col}`}
        >
          <img
            style={{ width: "10%" }}
            className={`${styles.item__img}`}
            role="button"
            onClick={openInviteModal}
            src={addIcon}
            alt="icon"
          />
          <p
            role="button"
            onClick={openInviteModal}
            className={`mb-0 ${styles.item_p}`}
          >
            Invite people to workspace
          </p>
        </div>
      ) : null}
    </div>
  )
}
