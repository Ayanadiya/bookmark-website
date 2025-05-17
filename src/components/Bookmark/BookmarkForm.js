import { useState,useContext } from "react"
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import BookmarkContext from "../../store/Bookmark-Context";


const BookmarkForm=props=>{
    const bookmarkctx=useContext(BookmarkContext)
    const {isEditing}=props
    const [sitename,setSitename]=useState("");
    const [url, setUrl]=useState("");
    const sitenameChangeHandler=(event)=>setSitename(event.target.value);
    const urlChangeHandler=(event)=> setUrl(event.target.value);

    const submitHandler=(event)=>{
        event.preventDefault();
        const bookmark={
            id:Math.random().toString(),
            sitename:sitename,
            url:url
        }
        if(isEditing)
        {
           bookmarkctx.editBookmarks();
        }
        else{
            bookmarkctx.addBookmarks(bookmark);
        }
    }
    return (
         <Modal onClick={props.onClose}>
            <form onSubmit={submitHandler}>
                <div>
                    <input id="sitename" value={sitename} name="sitename" placeholder="Sitename" onChange={sitenameChangeHandler}/>
                    <input id="url" value={url} name="url" placeholder="url" onChange={urlChangeHandler}/>
                    <Button type="submit" label={isEditing?"Update":"Add"}></Button>
                </div>
            </form>
         </Modal>
    )
}

export default BookmarkForm;