import React from "react";

const BookmarkContext=React.createContext({
    bookmarks:[],
    addBookmarks:()=>{},
    editBookmarks:()=>{},
    deleteBookmarks:()=>{}
})

export default BookmarkContext;