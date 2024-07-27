import CommentBox from './CommentBox'
import ReplyBox from './ReplyBox'
import { Comment } from '../data/dataProps'
import { useAppSelector } from '../store/hook'
import ReplyForm from './ReplyForm'
import RepliedCommentReplyForm from './RepliedCommentReplyForm'

interface Props{
    comment : Comment
}

const CommentAndReply = ({comment}: Props) => {
    const replies = comment.replies
    const isReplyHave = replies.length !== 0

    const {replyDetail,nestedReplyParentId} = useAppSelector(state=>state.currentUser)

    return (
     <div>
        <CommentBox comment={comment}/>
        {replyDetail.isCommentReply && replyDetail.replyUserId ===comment.id && <ReplyForm commentId={replyDetail.replyUserId} name={replyDetail.replyUser} parentId={nestedReplyParentId}/>}

        {isReplyHave && <div className="collapse-line">
            {replies.map((data,index)=>{
                return(
                    <div key={index}>
                        <ReplyBox replyData={data}/>
                        {replyDetail.isRepliedCommentReply && 
                        replyDetail.replyUserId ===data.id 
                            && replyDetail.replyUser === data.user.username
                                 && <RepliedCommentReplyForm commentId={replyDetail.replyUserId} name={replyDetail.replyUser} parentId={nestedReplyParentId}/>}
                    </div>
                )
            })}
        </div>}
    </div>
    )
}

export default CommentAndReply
