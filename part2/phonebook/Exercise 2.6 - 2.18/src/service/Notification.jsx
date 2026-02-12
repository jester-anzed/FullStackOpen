const Notification = ({ message }) => {
    if (message !== null ) {
        if (message.type === "success") {
            return <div className="added">{message.message}</div>
        } else {
            return <div className="error">{message.message}</div>
        }
    }
  
}

export default Notification