import useAuth from "../context/AuthContext"
export default function About(){
    const {CurrentUser}=useAuth()
    if(CurrentUser){
        return(
            <>
            <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {CurrentUser.Username} </h1>
      <p className="mt-4 text-gray-700">
        This is your About page content...
      </p>
    </div>
            </>
        )
    }
    return(
        <>
        <div className="flex items-center justify-center h-screen text-xl text-gray-700">
        Please log in to view this page.
      </div>
        </>
    )
}