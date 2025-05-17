import { useContext } from "react";
import BookmarkContext from "../../store/Bookmark-Context";
const BookmarkList = ({ onEdit }) => {
  const Bookmarkctx = useContext(BookmarkContext);

  return (
    <ul>
      {Bookmarkctx.bookmarks.map((item) => (
        <li key={item.id}>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.sitename}
          </a>{" "}
          - {item.url}
          <button onClick={() => Bookmarkctx.deleteBookmarks(item.id)}>Delete</button>
          <button onClick={() => onEdit(item)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default BookmarkList;