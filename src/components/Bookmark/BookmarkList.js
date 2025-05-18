import { useContext } from "react";
import BookmarkContext from "../../store/Bookmark-Context";
import classes from "./BookmarkList.module.css"
const BookmarkList = ({ onEdit }) => {
  const Bookmarkctx = useContext(BookmarkContext);

  return (
    <ul className={classes.ul}>
      {Bookmarkctx.bookmarks.map((item) => (
        <li className={classes.li} key={item._id}>
           {item.sitename}
          <a href={item.url} target="_self" rel="noreferrer">
           Visit
          </a>{" "}
          <button onClick={() => Bookmarkctx.deleteBookmarks(item._id)}>Delete</button>
          <button onClick={() => onEdit(item)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default BookmarkList;