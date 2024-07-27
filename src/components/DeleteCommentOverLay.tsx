import { useDispatch } from "react-redux"
import { deleteComment, deleteReply, getIsCommentDelete } from "../store/userSlice"
import { useAppSelector } from "../store/hook"

const DeleteCommentOverLay = () => {
    const dispatch = useDispatch()

    const {isRepliedComment,deletedCommentId} = useAppSelector(state=>state.currentUser)    

    const handleDeleteComment = () => {
        dispatch(getIsCommentDelete(false));

        if (isRepliedComment) {
          dispatch(deleteReply(deletedCommentId));
        } else {
          dispatch(deleteComment(deletedCommentId));
        }
      };

    return (
        <div className='fixed z-30 w-full h-full flex justify-center items-center bg-zinc-900/40'>
            <div className='bg-white w-[335px] px-5 py-3 rounded-md shadow-lg'>
                <h4 className='font-semibold text-lg py-2'>Delete comment</h4>
                <p className='text-[#8a8888] text-[.9rem]'>Are you sure you want to delete this comment?.This will remove the comment and can't be undone.</p>
                <div className='flex space-x-3 py-4'>
                    <button onClick={()=>dispatch(getIsCommentDelete(false))} className='bg-gray-500 text-white px-6 py-2 rounded-md uppercase text-[.9rem]'>No, cancel</button>
                    <button onClick={handleDeleteComment} className='bg-red-500 text-white px-6 py-2 rounded-md uppercase text-[.9rem]'>Yes, delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCommentOverLay
