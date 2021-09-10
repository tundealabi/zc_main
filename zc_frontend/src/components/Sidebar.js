import axios from 'axios'
import { useContext, Fragment } from 'react'
import useSWR from 'swr'
import { URLContext } from '../context/Url'

import styles from '../styles/Sidebar.module.css'
import Dropdown from './Dropdown'

const fetcher = url => fetch(url).then(res => res.json())

export const Sidebar = () => {
  const { data: channelsData } = useSWR('/api/plugin/channels', fetcher)
  const { data: messagesData } = useSWR('/api/plugin/messages', fetcher)
  const { data: plugins } = useSWR('/api/plugin/list', fetcher)

  const { setUrl } = useContext(URLContext)

  const sidebarApi = () => {
    axios({
      url: `https://channels.zuri.chat/api/v1/sidebar/?org=1&user=43567868`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Vary: 'Accept, Accept-Language, Origin',
        Allow: 'GET, HEAD, OPTIONS'
      }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className={styles.container}>
      <div className={styles.zuriLogo}>
        <img src="/zurichatlogo.svg" alt="Zuri Chat logo" />
        <p>ZURI</p>
      </div>
      <div className={styles.orgInfo}>
        <div className={styles.orgName}>
          <p>HNGi8</p>
          <img
            src="/shapekeyboardarrowdown.svg"
            alt="Organisation settings button"
          />
        </div>
        <div className={styles.newMessage}>
          <img src="/newmessage.svg" alt="New message icon" />
        </div>
      </div>
      <Dropdown title="Channels">
        {channelsData &&
          channelsData.channels.map((channel, index) => (
            <Fragment key={index}>
              <span>#</span>
              {channel.name}
            </Fragment>
          ))}
      </Dropdown>
      {plugins &&
        Object.keys(plugins).map(key => (
          <Dropdown
            title={plugins[key].name}
            key={key}
            showAddButton={true}
            onTitleClick={() => setUrl(key)}
            onAddButtonClick={() => {
              console.log(sidebarApi)
            }}
          ></Dropdown>
        ))}
      <Dropdown title="messages">
        {messagesData &&
          messagesData.messages.map((message, index) => (
            <Fragment key={index}>
              <span>
                <img src={message.avatar} alt="avatar" />
              </span>
              {message.name}
            </Fragment>
          ))}
      </Dropdown>
    </div>
  )
}
