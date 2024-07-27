import plus from "../images/icon-plus.svg"
import minus from "../images/icon-minus.svg"
import reply from "../images/icon-reply.svg"
import edit from "../images/icon-edit.svg"
import trash from "../images/icon-delete.svg"

import { Comment } from "../data/dataProps"
import { useAppSelector } from "../store/hook"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { getDeletedCommentId, getIsCommentDelete, getIsRepliedComment,getReplyDetails, updateCommentContent } from "../store/userSlice"

interface Props{
  comment:Comment
}

const CommentBox = ({comment}:Props) => {

  const dispatch = useDispatch()
  const newCommentRef = useRef(null);
  const [vote,setVote] = useState(comment.score)
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedContent, setUpdatedContent] = useState<string>(comment.content);

  const {userData:user,isAddNewComment:isAdd} = useAppSelector(state=>state.currentUser)
  const isYou = user.username === comment.user.username 
  
    
  
  const handleIncreaseClick = ()=>{
      setVote((vote)=> vote + 1)
  }

  const handleDecreaseClick = ()=>{
      setVote(vote=>vote - 1)
  }

  const handleTrashIconClick = (id:number)=>{
    dispatch(getIsCommentDelete(true))
    dispatch(getDeletedCommentId(id))
    dispatch(getIsRepliedComment(false))
}

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleUpdateComment = () => {
    if (updatedContent.trim()) {
      dispatch(updateCommentContent({ id: comment.id, content: updatedContent }));
      setIsEdit(false);
    }
  };

  const handleReplyClick = (name:string,id:number)=>{
    const detail = {
      replyUser:name,
      replyUserId:id,
      isCommentReply:true,
      isRepliedCommentReply:false
    }
    dispatch(getReplyDetails(detail))

  }

  useEffect(() => {
    if (newCommentRef.current) {
        newCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
}, [comment]);  


  
  return (
        <div ref={ isAdd ?newCommentRef:null } className='flex mt-4 p-4 w-[348px] md:w-[580px] lg:w-[630px] bg-white shadow-md rounded-lg'>
            <div className="hidden md:block">
              <div className="bg-[#F5F7FB] w-9 flex flex-col items-center space-y-3 rounded-md px-2 py-2">
                <img src={plus} alt="Plus Icon" onClick={handleIncreaseClick}/>
                <span className="text-zinc-500">{vote}</span>
                <img src={minus} alt="Minus Icon" onClick={handleDecreaseClick}/>
              </div>
            </div>

            <div className="md:ps-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img className="size-8" src={comment.user.image.webp} alt="Amyrohson Profile" />
                  <h5 className="font-semibold flex items-center">
                    {comment.user.username}
                    {isYou && <span className="bg-[#5357B6] ms-1 px-2 rounded-sm text-[.7rem] text-white">you</span>}
                  </h5>
                  <p className="text-[#8a8888]">{comment.createdAt}</p>
                </div>

                {
                  isYou ?(
                    <div className="hidden md:flex space-x-4 ps-24">
                      <div onClick={()=>handleTrashIconClick(comment.id)} className="flex items-center space-x-2 cursor-pointer">
                        <img src={trash} alt="Delete Icon" />
                        <p className="text-[#5357B6]">Delete</p>
                      </div>
                      <div onClick={handleEditClick} className="flex items-center space-x-2">
                        <img src={edit} alt="Edit Icon" />
                        <p className="text-[#5357B6]">Edit</p>
                      </div>
                  </div>
                  ) :(
                    <div onClick={()=>handleReplyClick(comment.user.username,comment.id)} className="hidden md:flex items-center space-x-2 cursor-pointer">
                      <img src={reply} alt="Reply Icon" />
                      <p className="text-[#5357B6]">Reply</p>
                    </div>
                  ) 
                }
              </div>

              {isEdit ? (
                <div className="pt-3 text-[#8a8888] text-[.9rem]">
                  <textarea
                    value={updatedContent}
                    onChange={e => setUpdatedContent(e.target.value)}
                    rows={4}
                    className="block p-2 mb-3 w-[290px] md:w-[400px] lg:w-[460px] resize-none text-sm rounded-lg border outline-none"
                  ></textarea>
                  <button onClick={handleUpdateComment} className="bg-blue-800 text-white py-2 px-3 rounded-md float-right uppercase">Update</button>
                </div>
              ) : (
                <p className="pt-2 text-[#8a8888] text-[.9rem]">
                  {comment.content}
                </p>
              )}

              <div className="flex items-center justify-between md:hidden pt-4">
                <div className="bg-[#F5F7FB] flex items-center space-x-3 rounded-md px-2 py-2">
                  <img src={plus} alt="Plus Icon" onClick={handleIncreaseClick} />
                  <span className="text-zinc-500">{vote}</span>
                  <img src={minus} alt="Minus Icon" onClick={handleDecreaseClick} />
                </div>

                {
                  isYou ?(
                    <div className="flex space-x-4">
                      <div onClick={()=>handleTrashIconClick(comment.id)} className="flex items-center space-x-2 cursor-pointer">
                        <img src={trash} alt="Delete Icon" />
                        <p className="text-[#5357B6]">Delete</p>
                      </div>
                      <div onClick={handleEditClick} className="flex items-center space-x-2">
                        <img src={edit} alt="Edit Icon" />
                        <p className="text-[#5357B6]">Edit</p>
                      </div>
                  </div>
                  ) :(
                    <div onClick={()=>handleReplyClick(comment.user.username,comment.id)} className="flex items-center space-x-2 cursor-pointer">
                      <img src={reply} alt="Reply Icon" />
                      <p className="text-[#5357B6]">Reply</p>
                    </div>
                  ) 
                }
              </div>
            </div>
      
        </div>
  )
}

export default CommentBox
