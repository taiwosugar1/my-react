import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc, Timestamp, increment } from "firebase/firestore";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebase";
import "./Comments.scss"

const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            const commentsCollection = collection(db, "comments");
            const q = query(commentsCollection, where("postId", "==", postId));
            const commentSnapshot = await getDocs(q);
            const commentsList = commentSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(commentsList);
        };

        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim() === "") return;

        const postRef = doc(db, "posts", postId);

        try {
            const commentData = {
                postId,
                desc: newComment,
                name: currentUser.name || "Anonymous",
                profilePicture: currentUser.profilePic || "defaultProfilePic.jpg",
                userId: currentUser.uid, // Ensure userId is stored in comments
                timestamp: Timestamp.now(),
            };

            await addDoc(collection(db, "comments"), commentData);
            await updateDoc(postRef, {
                commentsCount: increment(1),
            });

            setComments((prevComments) => [
                ...prevComments,
                { ...commentData, id: new Date().getTime().toString() },
            ]);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleEdit = (comment) => {
        setEditCommentId(comment.id);
        setEditCommentText(comment.desc);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (editCommentText.trim() === "") return;

        try {
            const commentRef = doc(db, "comments", editCommentId);
            await updateDoc(commentRef, {
                desc: editCommentText,
            });

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === editCommentId ? { ...comment, desc: editCommentText } : comment
                )
            );

            setEditCommentId(null);
            setEditCommentText("");
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDelete = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                const commentRef = doc(db, "comments", commentId);
                await deleteDoc(commentRef);

                // Update comments count in the post
                const postRef = doc(db, "posts", postId);
                await updateDoc(postRef, {
                    commentsCount: increment(-1), // Decrement comment count
                });

                setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
            } catch (error) {
                console.error("Error deleting comment:", error);
            }
        }
    };

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleSubmit}>Send</button>
            </div>

            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <img src={comment.profilePicture} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                             {currentUser.uid === comment.userId && ( // Assuming you have userId stored in the comment
                            <div className="actions">
                                <button onClick={() => handleEdit(comment)}>Edit</button>
                                <button onClick={() => handleDelete(comment.id)}>Delete</button>
                            </div>
                        )}
                            {editCommentId === comment.id ? (
                              
                                <>
                                    <input
                                        type="text"
                                        value={editCommentText}
                                        onChange={(e) => setEditCommentText(e.target.value)}
                                    />
                                    <button onClick={handleUpdate}>Update</button>
                                </>
                            ) : (
                                <p>{comment.desc}</p>
                            )}
                        </div>
                        <span className="date">
                            {comment.timestamp?.toDate().toLocaleString() || "Just now"}
                        </span>
                       
                    </div>
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
};

export default Comments;
