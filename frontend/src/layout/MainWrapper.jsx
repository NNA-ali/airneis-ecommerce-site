import { useEffect, useState } from "react";
import { setUser } from '../utils/auth';

const MainWrapper = ({ children }) => {
    const [loading, setloading] = useState(true)

    useEffect(async() => {
        const handler = async () => {
            setloading(true)
            await setUser()
            setloading(false)
        }
        handler()
        
    },[])
   return <>{loading ? null :children} </>
}



export default MainWrapper