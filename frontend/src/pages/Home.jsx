import { useEffect, useState } from 'react'
import api from '../services/api'

const Home = () => {
    const [message, setMessage] = useState()

    useEffect(() => {
        fetchMessage();
    }, [])

    const fetchMessage = async () => {
        try {
            const res = await api.get('/')
            setMessage(res.data.message)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>{message}</div>
    )
}

export default Home