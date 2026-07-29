import { MoveLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const MoveBack = () => {
    const navigate = useNavigate()
    return (
        <MoveLeft
            className="absolute top-5 sm:top-10 left-5 sm:left-10 z-10 sm:w-10 sm:h-10 w-8 h-8 sm:p-2 p-1.5 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
            onClick={() => navigate(-1)}
        />
    )
}