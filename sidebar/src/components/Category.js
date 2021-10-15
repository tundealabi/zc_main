import React, { Fragment, useState } from "react"
import DropDown from "./Drop"
import Room from "./Room"
import SubCategory from "./subCategory"
import SkeletonLoader from "./SkeletonLoader"

export default function Category(props) {
  const [isOpen, setOpen] = useState(false)

  const toggleDropdown = () => setOpen(!isOpen)

  return props.data ? (
    <Fragment>
      {props.name && (
        <DropDown
          categoryName={props.name}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
        />
      )}
       {props.data &&
        props.data.length > 0 &&
        props.data.map(plugin => {
          console.error("showwwwmw", plugin)
          if (plugin.show_group) {
            return (
              <SubCategory
                isOpen={isOpen}
                key={plugin.name}
                name={plugin.group_name}
                state={plugin}
              />
            )
          } else {
            return (
              <Room
                isOpen={isOpen}
                key={plugin.name}
                id={plugin.group_name}
                isDirect={true}
                items={plugin}
              />
            )
          }
        })}
      {/* {props.state.sidebar &&
        props.name &&
        Object.keys(props.state.sidebar).map((c, index) => {

         return Object.values(props.state.sidebar[c]).map((plugin, idx)=>{
 
            
            return c && c === props.name ? (
              <Room
                isOpen={isOpen}
                itemName={props.name} 
                id={props.state.sidebar.name}
                key={index}
                items={plugin}
              />
            ) : null
          })
        }
        )} */}
    </Fragment>
  ) : (
    <SkeletonLoader />
  )
}
