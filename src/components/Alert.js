import { useEffect } from "react"

const Alert = ({ type, msg, removeAlert}) => {

    useEffect(() => {
        const dismissAlert = setTimeout(() => {
            removeAlert()
        }, 3000)

        return () => clearTimeout(dismissAlert)
    },[removeAlert])
    return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
