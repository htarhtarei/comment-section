import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hook";
import { getDeletedCommentId, getIsCommentDelete, getIsRepliedComment, getNestedReplyParentId, getReplyDetails, updateCommentContent } from "../store/userSlice";
import plus from "../images/icon-plus.svg";
import minus from "../images/icon-minus.svg";
import reply from "../images/icon-reply.svg";
import edit from "../images/icon-edit.svg";
import trash from "../images/icon-delete.svg";
import { Reply } from "../data/dataProps";

interface Props {
  replyData: Reply;
}

const ReplyBox = ({ replyData }: Props) => {
  const dispatch = useDispatch();
  const { userData: user} = useAppSelector(state => state.currentUser);
  const isYou = user.username === replyData.user.username;

  const newContent = replyData.content.replace(`@${replyData.replyingTo} `, '');


  const [vote, setVote] = useState(replyData.score);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedContent, setUpdatedContent] = useState<string>(`@${replyData.replyingTo} ${newContent}`);
  const textareaRef = useRef<HTMLTextAreaElement>(null);  

  useEffect(() => {
    if (isEdit && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(updatedContent.length, updatedContent.length);
    }
  }, [isEdit, updatedContent.length]);


  const handleIncreaseClick = () => {
    setVote(vote => vote + 1);
  };

  const handleDecreaseClick = () => {
    setVote(vote => vote - 1);
  };

  const handleTrashIconClick = (id: number) => {
    dispatch(getIsCommentDelete(true));
    dispatch(getDeletedCommentId(id));
    dispatch(getIsRepliedComment(true));
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleUpdateComment = () => {
    if (updatedContent.trim()) {
      dispatch(updateCommentContent({ id: replyData.id, content: updatedContent }));
      setIsEdit(false);
    }
  };

  const handleReplyClick = (name:string,id:number,parentId:number)=>{
    const detail = {
      replyUser:name,
      replyUserId:id,
      isCommentReply:false,
      isRepliedCommentReply:true
      
    }
    dispatch(getReplyDetails(detail))

    dispatch(getNestedReplyParentId(parentId))

  }

  return (
    <div>
      <div className='flex p-4 mt-4 ms-5 md:ms-12 w-[325px] md:w-[500px] lg:w-[550px] bg-white shadow-md rounded-lg'>
        <div className="hidden md:block">
          <div className="bg-[#F5F7FB] w-9 flex flex-col items-center space-y-3 rounded-md px-2 py-2">
            <img src={plus} alt="Plus Icon" onClick={handleIncreaseClick} />
            <span className="text-zinc-500">{vote}</span>
            <img src={minus} alt="Minus Icon" onClick={handleDecreaseClick} />
          </div>
        </div>

        <div className="md:ps-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img className="size-8" src={replyData.user.image.webp} alt="User Profile" />
              <h5 className="font-semibold flex items-center">
                {replyData.user.username}
                {isYou && <span className="bg-[#5357B6] ms-1 px-2 rounded-sm text-[.7rem] text-white">you</span>}
              </h5>
              <p className="text-[#8a8888] pe-6">{replyData.createdAt}</p>
            </div>

            {isYou ? (
              <div className="hidden md:flex space-x-4">
                <div onClick={() => handleTrashIconClick(replyData.id)} className="flex items-center space-x-1 cursor-pointer">
                  <img src={trash} alt="Delete Icon" />
                  <p className="text-[#5357B6]">Delete</p>
                </div>
                <div onClick={handleEditClick} className="flex items-center space-x-2 cursor-pointer">
                  <img src={edit} alt="Edit Icon" />
                  <p className="text-[#5357B6]">Edit</p>
                </div>
              </div>
            ) : (
              <div onClick={()=>handleReplyClick(replyData.user.username,replyData.id,replyData.parentId)} className="hidden md:flex items-center space-x-2 cursor-pointer">
                <img src={reply} alt="Reply Icon" />
                <p className="text-[#5357B6]">Reply</p>
              </div>
            )}
          </div>

          {isEdit ? (
            <div className="pt-3 text-[#8a8888] text-[.9rem]">
              <textarea
                ref={textareaRef}
                value={updatedContent}
                onChange={e => setUpdatedContent(e.target.value)}
                rows={4}
                className="block p-2 mb-3 w-[290px] md:w-[400px] lg:w-[460px] resize-none text-sm rounded-lg border outline-none"
              ></textarea>
              <button onClick={handleUpdateComment} className="bg-blue-800 text-white py-2 px-3 rounded-md float-right uppercase">Update</button>
            </div>
          ) : (
            <p className="pt-2 text-[#8a8888] text-[.9rem]">
              <span className="text-[#3e418e] font-bold pe-1">@{replyData.replyingTo}</span>
              {newContent}
            </p>
          )}

          <div className="flex items-center justify-between md:hidden pt-4">
            <div className="bg-[#F5F7FB] flex items-center space-x-3 rounded-md px-2 py-2">
              <img src={plus} alt="Plus Icon" onClick={handleIncreaseClick} />
              <span className="text-zinc-500">{vote}</span>
              <img src={minus} alt="Minus Icon" onClick={handleDecreaseClick} />
            </div>

            {isYou ? (
              <div className="flex space-x-4">
                <div onClick={() => handleTrashIconClick(replyData.id)} className="flex items-center space-x-2 cursor-pointer">
                  <img src={trash} alt="Delete Icon" />
                  <p className="text-[#5357B6]">Delete</p>
                </div>
                <div onClick={handleEditClick} className="flex items-center space-x-2 cursor-pointer">
                  <img src={edit} alt="Edit Icon" />
                  <p className="text-[#5357B6]">Edit</p>
                </div>
              </div>
            ) : (
              <div onClick={()=>handleReplyClick(replyData.user.username,replyData.id,replyData.parentId)} className="flex items-center space-x-2 cursor-pointer">
                <img src={reply} alt="Reply Icon" />
                <p className="text-[#5357B6]">Reply</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyBox;
