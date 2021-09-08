import React, { useContext, useEffect, useRef } from 'react'
import { PluginLoaderContext } from '../contexts/Url'
import styles from '../styles/PluginLoader.module.css'

const PluginLoader = () => {

  const { loader } = useContext(PluginLoaderContext);
  const loaderEl = useRef(null);

  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        loaderEl.current.animation = "reduce 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);"
      }, 1000)
    }
  })

  return (
    <div ref={loaderEl} class={styles.loader}>
      <svg xmlns="http://www.w3.org/2000/svg" width="67" height="72" viewBox="0 0 47 52" fill="none">
        <rect class={styles.topLeft} x="6.30078" width="18.9016" height="19.8545" rx="1.0991" fill="#00B87C" />
        <rect class={styles.bottomLeft} y="22.6904" width="18.9016" height="19.8545" rx="1.0991" fill="#FEA162" />
        <rect class={styles.topRight} x="27.9033" y="9.45508" width="18.9016" height="19.8545" rx="1.0991" fill="#1A61DB" />
        <rect class={styles.bottomRight} x="21.6025" y="32.1455" width="18.9016" height="19.8545" rx="1.0991" fill="#DC1AA3" />
      </svg>
    </div>
  )
}

export default PluginLoader
