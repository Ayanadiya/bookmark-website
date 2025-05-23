import { useState,useContext, useEffect } from "react"
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import BookmarkContext from "../../store/Bookmark-Context";


const BookmarkForm=props=>{
    const bookmarkctx=useContext(BookmarkContext)
    const {isEditing, existingData}=props
    const [sitename,setSitename]=useState("");
    const [url, setUrl]=useState("");
    const sitenameChangeHandler=(event)=>setSitename(event.target.value);
    const urlChangeHandler=(event)=> setUrl(event.target.value);

    useEffect(() => {
    if (isEditing && existingData) {
      setSitename(existingData.sitename);
      setUrl(existingData.url);
    }
  }, [isEditing, existingData]);

    const submitHandler=(event)=>{
        event.preventDefault();
        if(isEditing)
        {
           bookmarkctx.editBookmarks({
            _id:existingData._id,
            sitename:sitename,
            url:url
        });
        }
        else{
            bookmarkctx.addBookmarks({
            sitename:sitename,
            url:url
        });
        }
        props.onClose();
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