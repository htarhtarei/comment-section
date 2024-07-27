import { createSlice} from "@reduxjs/toolkit";
import { Comment, User } from "../data/dataProps";
import { dummyData } from "../data/data";

interface Props{
    userData:User
    comments:Comment[]
    isAddNewComment: boolean
    isCommentDelete:boolean
    deletedCommentId:null | number
    isRepliedComment:boolean
    replyDetail:{
      isCommentReply:boolean
      isRepliedCommentReply:boolean
      replyUser: string
      replyUserId:null | number
    }
  nestedReplyParentId : number | null
}

const commentDatas =dummyData[0].comments    


const initialState:Props ={
    userData : {
        image: {png: "", webp: ""},
        username: ""
    },
    comments:commentDatas,
    isAddNewComment: false,
    isCommentDelete:false,
    deletedCommentId:null,
    isRepliedComment:false,
    replyDetail:{
      isCommentReply:false,
      isRepliedCommentReply:false,
      replyUser:"",
      replyUserId: null
    },
    nestedReplyParentId: null,
}


export const userSlice = createSlice({ 
    name: 'user', 
    initialState, 
    reducers: {
      getCurrentUser : (state,{payload})=>{
        state.userData = payload
      },
      getComments:(state,{payload})=>{
        state.comments.push(payload)

      },
      getIsAddNewComment:(state,{payload})=>{
        state.isAddNewComment = payload
      },
      getIsCommentDelete:(state,{payload})=>{
        state.isCommentDelete = payload
      },
      getDeletedCommentId:(state,{payload})=>{
        state.deletedCommentId = payload
      },
      getIsRepliedComment:(state,{payload}) =>{
        state.isRepliedComment = payload
      },
      getReplyDetails:(state,{payload})=>{
        state.replyDetail = payload
      },
      getNestedReplyParentId:(state ,{payload})=>{
        state.nestedReplyParentId = payload
      },
      addReply: (state, { payload }) => {
        const { commentId, reply } = payload;
        state.comments = state.comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, reply]
            };
          }else if(comment.id === state.nestedReplyParentId){
            return {
              ...comment,
              replies: [...comment.replies, reply]
            };
          }
          return comment;
        });
      },
      deleteComment: (state, { payload }) => {
        state.comments = state.comments.filter(comment => comment.id !== payload);
      },
      deleteReply: (state, { payload }) => {
        state.comments = state.comments.map(comment => ({
          ...comment,
          replies: comment.replies.filter(reply => reply.id !== payload),
        }));
      },
      updateCommentContent: (state, { payload }) => {
        const { id, content } = payload;
        state.comments = state.comments.map(comment => {
          if (comment.id === id) {
            return { ...comment, content };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map(reply => reply.id === id ? { ...reply, content } : reply)
            };
          }
          return comment;
        });
      }, 
    }
  })

  export const {
    getCurrentUser,
    getComments,
    getIsAddNewComment,
    getIsCommentDelete,
    getDeletedCommentId,
    getIsRepliedComment,
    getReplyDetails,
    getNestedReplyParentId,
    addReply,
    deleteComment,
    deleteReply,
    updateCommentContent,
  } = userSlice.actions
  export default userSlice.reducer

