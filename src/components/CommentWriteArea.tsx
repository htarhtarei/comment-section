import { useState } from "react"
import { User } from "../data/dataProps"
import { useAppDispatch } from "../store/hook"
import moment from "moment"
import { getComments, getIsAddNewComment } from "../store/userSlice"
import { v4 as uuidv4 } from 'uuid';


interface Props{
  user:User
}

const CommentWriteArea = ({user}:Props) => {

  const [input,setInput] = useState<string>("") 

  const dispatch = useAppDispatch()
  
  const handleSentCommentSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault() 

    const dateTimeAgo = moment(new Date()).fromNow();
    
    const userComment = {
      content: input,
      createdAt: dateTimeAgo,
      id: uuidv4() ,
      replies: [],
      isReply:false,
      score:0,
      user
    }
    dispatch(getComments(userComment))

    dispatch(getIsAddNewComment(true))

    setInput("")
  }

  return (
    <div className="fixed bottom-3 border">
      <form onSubmit={handleSentCommentSubmit} className="p-3 w-[348px] md:w-[580px] lg:w-[630px] bg-white shadow-md rounded-lg">
        <div className="block md:hidden">
            <textarea value={input} onChange={(e)=> setInput(e.target.value)} id="message" rows={4} className="block p-2 mb-3 w-full resize-none text-sm text-[#8a8888] rounded-lg border outline-none" placeholder="Add a comment..."></textarea>
            <hr />
            <div className="flex justify-between pt-3">
                <img className="size-8" src={user.image.webp} alt="My Profile Pic" />
                <button className="bg-[#5357B6] text-white text-[.9rem] px-3 rounded-lg">SEND</button>
            </div>
        </div>

        <div className="hidden md:flex justify-between pt-4 space-x-3">
            <img className="size-8" src={user.image.webp} alt="My Profile Pic" />
            <textarea value={input} onChange={(e)=> setInput(e.target.value)} id="message" rows={4} className="block p-2 mb-4 w-full resize-none text-sm text-[#8a8888] rounded-lg border outline-none" placeholder="Add a comment..."></textarea>
            <button className="bg-[#5357B6] h-9 text-white text-[.9rem] px-5 rounded-lg">SEND</button>
        </div>
      </form>
    </div>
  )
}

export default CommentWriteArea
