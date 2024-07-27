import { useEffect } from "react"
import CommentList from "./components/CommentList"
import CommentWriteArea from "./components/CommentWriteArea"
import { dummyData } from "./data/data"
import { useAppDispatch, useAppSelector } from "./store/hook"
import { getCurrentUser } from "./store/userSlice"
import DeleteCommentOverLay from "./components/DeleteCommentOverLay"


function App() {
  const dispatch = useAppDispatch()

  const {isCommentDelete:isDelete} = useAppSelector(state=>state.currentUser)

  const currentUserData = dummyData[0].currentUser  

  useEffect(()=>{
    dispatch(getCurrentUser(currentUserData))
  },[])

  return (
    <div className="font-poppins max-h-screen overflow-y-scroll no-scrollbar w-full">
      {isDelete && <DeleteCommentOverLay/>}
      <div className="flex justify-center items-center py-8">
        <div>
          <CommentList/>
          <CommentWriteArea user={currentUserData}/>
        </div>
      </div>
    </div>
  )
}

export default App
