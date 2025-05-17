import Header from './components/Layout/Header';
import './App.css';
import BookmarkProvider from './store/BookmarkProvider';
import { useState } from 'react';
import BookmarkForm from './components/Bookmark/BookmarkForm';
import BookmarkList from './components/Bookmark/BookmarkList';

function App() {
  const [isVisible, setVisible]=useState(false);
  const [isEditing, setEditing]=useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  
   const showAddForm = () => {
    setSelectedBookmark(null);
    setEditing(false);
    setVisible(true);
  };

  
  const showEditForm = (bookmark) => {
    setSelectedBookmark(bookmark);
    setEditing(true);
    setVisible(true);
  };

  const closeForm = () => {
    setVisible(false);
    setEditing(false);
    setSelectedBookmark(null);
  };

  return (
    <div className="App">
    <BookmarkProvider>
      {isVisible && <BookmarkForm 
      isEditing={isEditing} 
      existingData={selectedBookmark}
      onClose={closeForm}
      />}
     <Header onClick={showAddForm}/>
     <main>
      <BookmarkList onEdit={showEditForm}/>
     </main>
     </BookmarkProvider>
    </div>
  );
}

export default App;
