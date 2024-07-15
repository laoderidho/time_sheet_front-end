import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../config/API"
import { useNavigate, Outlet, useLocation } from "react-router-dom"

const ProtectedRoute = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const location = useLocation()
    const [profile, setProfile] = useState(null)

    useEffect(()=>{
        const getData = async () =>{
            try {
                const res = await axios.get(`${API}/auth/profile`, {
                    headers: {
                        Authorization: token
                    }
                })

                setProfile(res.data)
                localStorage.setItem('name', res.data.name)
                localStorage.setItem('rate', res.data.rate)
            } catch (error) {
                localStorage.removeItem('token')
                localStorage.removeItem('name')
                localStorage.removeItem('rate')
                navigate('/login')
            }
        }

        if(token){
            getData()
        }
        else{
            navigate('/login')
        }
    }, [token, navigate, location.pathname])    

    return profile ? <Outlet /> : null
}

export default ProtectedRoute