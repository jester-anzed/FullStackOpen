import { useState } from 'react'


const Toggle = (props) => {
    const [visible, setVisible] = useState(false)

    const showVisible = {display: visible ? '' : 'none'}
    const hideVisible = {display: visible ? 'none' : ''}

    const toggleVisible = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideVisible}>
                <button onClick={toggleVisible}>{props.label}</button>
            </div>
            <div style={showVisible}>
                {props.children}
                <button onClick={toggleVisible}>Cancel</button>
            </div>
        </div>

    )


}

export default Toggle