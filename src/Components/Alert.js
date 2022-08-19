import React from 'react'

export default function Alert(props) {
  return (
    props.alert && <div className="container" zindex = '1'><div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{props.alert.type}
      </strong>{props.alert.msg}
    </div></div>


  )
}
