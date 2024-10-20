import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import './Stories.css';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newStory, setNewStory] = useState({ name: '', img: null });
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const fetchStories = async () => {
    try {
      const storiesCollection = collection(db, 'stories');
      const storiesSnapshot = await getDocs(storiesCollection);
      const storiesList = storiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter out stories older than 24 hours
      const filteredStories = storiesList.filter((story) => {
        const timestamp = story.timestamp?.toDate();
        return timestamp && Date.now() - timestamp.getTime() < 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      });

      setStories(filteredStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      const file = files[0];
      if (file && file.type.startsWith('image/')) {
        setNewStory((prevStory) => ({ ...prevStory, img: file }));
      } else {
        alert('Please select a valid image file.');
      }
    } else {
      setNewStory((prevStory) => ({ ...prevStory, [name]: value }));
    }
  };

  const handleStorySubmit = async (e) => {
    e.preventDefault();
    if (!newStory.name && !newStory.img) {
      setError('Please provide either a name, an image, or both!');
      return;
    }

    try {
      setUploading(true);
      let imgUrl = null;

      if (newStory.img) {
        const storageRef = ref(storage, `stories/${newStory.img.name}`);
        await uploadBytes(storageRef, newStory.img);
        imgUrl = await getDownloadURL(storageRef);
      }

      // Save story to Firestore with a timestamp
      await addDoc(collection(db, 'stories'), {
        name: newStory.name || '',
        img: imgUrl || '',
        timestamp: new Date(), // Store the current date/time
      });

      setNewStory({ name: '', img: null });
      setUploading(false);
      setShowForm(false);
      alert('Story added successfully!');
      fetchStories();
    } catch (error) {
      console.error('Error adding story:', error);
      setError('Failed to add story. Please try again.');
      setUploading(false);
    }
  };

  const handleDeleteStory = async (id) => {
    try {
      await deleteDoc(doc(db, 'stories', id));
      fetchStories(); // Refresh the list after deletion
      alert('Story deleted successfully!');
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setError('');
  };

  if (loading) {
    return <div>Loading stories...</div>;
  }

  return (
    <div className='stories'>
      <div className="story">
        <img
          src="https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Oguntoyinbo Taiwo"
        />
        <span>
          <h3>Oguntoyinbo Taiwo</h3>
        </span>
        <button onClick={toggleForm}>+</button>
      </div>

      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img || 'https://via.placeholder.com/150'} alt={story.name || 'Unnamed Story'} />
          <span>{story.name || 'Unnamed Story'}</span>
          <span onClick={() => handleDeleteStory(story.id)} className='delete-button'>X</span> {/* Button to delete story */}
        </div>
      ))}

      {showForm && (
        <div className="modal">
          <div className="modalContent">
            <h3>Add a New Story</h3>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleStorySubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name (optional)"
                value={newStory.name}
                onChange={handleInputChange}
              />
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={handleInputChange}
              />
              <button type="submit" disabled={uploading} className='delete'>
                {uploading ? 'Uploading...' : 'Add Story'}
              </button>
              <button type="button" onClick={toggleForm}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
