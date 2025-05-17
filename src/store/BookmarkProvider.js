import { useReducer } from "react";
import BookmarkContext from "./Bookmark-Context";

const defaultBookmarkState={
    bookmarks:[]
};

const bookmarkReducer=(state,action)=>{
    if(action.type==="add")
    {
         return {
        ...state,
        bookmarks: [...state.bookmarks, action.item],
      };
    }
    if(action.type==="edit")
    {
         return {
        ...state,
        bookmarks: state.bookmarks.map((bookmark) =>
          bookmark.id === action.item.id ? action.item : bookmark
        ),
       }
    }   
    if(action.type==="delete")
    {
        return {
            ...state,
            boomarks:state.bookmarks.filter((item)=> item.id!==action.id)
        }
    }
    return state
}

const BookmarkProvider=(props)=>{
    const [bookmarkState, dispatchBookmarkstate]=useReducer(bookmarkReducer,defaultBookmarkState);
    const addBookmarkHandler= item=>{
        dispatchBookmarkstate({type:"add", item:item})
    };
    const editBookmarkHandler=id=>{
        dispatchBookmarkstate({type:"edit", id:id})
    };
    const deleteBookmarkHandler=id=>{
        dispatchBookmarkstate({type:"delete", id:id})
    }
    const value={
        bookmarks:bookmarkState.bookmarks,
        addBookmarks:addBookmarkHandler,
        editBookmarks:editBookmarkHandler,
        deleteBookmarks:deleteBookmarkHandler
    }
    return <BookmarkContext.Provider value={value}>{props.children}</BookmarkContext.Provider>
}

export default BookmarkProvider;