import { useState } from 'react'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)

  const hideVisible = { display : visible ? 'none' : '' }
  const showVisible = { display : visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideVisible}>
        <button onClick={toggleVisibility}>{props.label}</button>
      </div>
      <div style={showVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>

  )

}

export default Toggle