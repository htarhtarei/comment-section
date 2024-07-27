import { useEffect, useRef, useState } from "react";
import { dummyData } from "../data/data";
import { useDispatch } from "react-redux";
import { addReply, getReplyDetails} from "../store/userSlice";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { useAppSelector } from "../store/hook";

interface Props {
  commentId: number | null;
  name: string;
  parentId: number | null
}

const ReplyForm = ({ commentId, name ,parentId}: Props) => {
    const dispatch = useDispatch();
    const user = dummyData[0].currentUser;

    const [replyInput, setReplyInput] = useState(`@${name} `);

    const {replyDetail} = useAppSelector(state=>state.currentUser)

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current ) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(replyInput.length, replyInput.length);
        }
      }, [replyInput.length]);

    const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dateTimeAgo = moment(new Date()).fromNow();

        if (replyInput.trim()) {
        const newReply = {
            replyId: uuidv4(),
            content: replyInput,
            createdAt: dateTimeAgo,
            parentId,
            score: 0,
            isReply:false,
            replyingTo: name,
            user: {
            image: user.image,
            username: user.username
            }
        };
        dispatch(addReply({ commentId, reply: newReply }));

        dispatch(getReplyDetails({ ...replyDetail, isCommentReply: false, isRepliedCommentReply: false }));
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleReplySubmit} className="p-3 w-[348px] md:w-[580px] lg:w-[630px] bg-white shadow-md rounded-lg">
        <div className="block md:hidden">
          <textarea
            ref={textareaRef}
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            id="message"
            rows={4}
            className="block p-2 mb-3 w-full resize-none text-sm text-[#8a8888] rounded-lg border outline-none"
            placeholder="Add a comment..."
          ></textarea>
          <hr />
          <div className="flex justify-between pt-3">
            <img className="size-8" src={user.image.webp} alt="My Profile Pic" />
            <button className="bg-[#5357B6] text-white text-[.9rem] px-3 rounded-lg">REPLY</button>
          </div>
        </div>

        <div className="hidden md:flex justify-between pt-4 space-x-3">
          <img className="size-8" src={user.image.webp} alt="My Profile Pic" />
          <textarea
            ref={textareaRef}
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            id="message"
            rows={4}
            className="block p-2 mb-4 w-full resize-none text-sm text-[#8a8888] rounded-lg border outline-none"
            placeholder="Add a comment..."
          ></textarea>
          <button className="bg-[#5357B6] h-9 text-white text-[.9rem] px-5 rounded-lg">REPLY</button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
