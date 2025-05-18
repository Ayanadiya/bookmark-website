import { useReducer, useEffect } from "react";
import BookmarkContext from "./Bookmark-Context";

const crudAPI="https://crudcrud.com/api/4ee50af2d5af4cd8bbe8b9b3636da181/bookmarks"

const defaultBookmarkState={
    bookmarks:[]
};

const bookmarkReducer=(state,action)=>{
    if(action.type==="set")
    {
        return{
            bookmarks:action.items
        }
    }
    if(action.type==="add")
    {
        console.log(state.bookmarks)
         return {
        ...state,
        bookmarks: [...state.bookmarks, action.item],
      };
    }
    if(action.type==="edit")
    {
        console.log(state.bookmarks)
        console.log(action.item)
         return {
        ...state,
        bookmarks: state.bookmarks.map((bookmark) =>
          bookmark._id === action.item._id ? action.item : bookmark
        ),
       }
    }   
    if(action.type==="delete")
    {
        return {
            ...state,
            bookmarks:state.bookmarks.filter((item)=> item._id!==action.id)
        }
    }
    return state
}

const BookmarkProvider=(props)=>{
    const [bookmarkState, dispatchBookmarkstate]=useReducer(bookmarkReducer,defaultBookmarkState);

    useEffect(() => {
    const fetchBookmarks = async () => {
      const res = await fetch(crudAPI);
      const data = await res.json();
      dispatchBookmarkstate({ type: "set", items: data });
    };
    fetchBookmarks();
    }, []);
    const addBookmarkHandler= async (item)=>{
        console.log(item);
        const res = await fetch(crudAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
        const newItem = await res.json();
        console.log(newItem);
        dispatchBookmarkstate({type:"add", item:newItem})
    };
    const editBookmarkHandler=async (item)=>{
        console.log(item);
        const{_id, ...rest}=item;
        const res= await fetch(`${crudAPI}/${_id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(rest),
        })

        dispatchBookmarkstate({type:"edit", item:item})
    };
    const deleteBookmarkHandler=async(id)=>{
        await fetch(`${crudAPI}/${id}`,{
            method:"DELETE",
        })
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