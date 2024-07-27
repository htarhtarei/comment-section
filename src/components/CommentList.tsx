import { useAppSelector } from '../store/hook';
import CommentAndReply from './CommentAndReply';


const CommentList = () => {
    const {comments} = useAppSelector(state => state.currentUser)

    return (
        <div className="mb-48 md:mb-40">
            {
                comments.map((data,index)=>(
                    <CommentAndReply key={index} comment={data}/>
                ))
            }
        </div>
       
    )
}

export default CommentList
