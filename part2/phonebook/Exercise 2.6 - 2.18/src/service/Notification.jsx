const Notification = ({ message }) => {
    if (message !== "" ) {
        return <div className="added">{message} has been added!</div>
    }
  
}

export default Notification