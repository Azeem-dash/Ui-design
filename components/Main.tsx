"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { HiFire } from "react-icons/hi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaFaceSmileWink } from "react-icons/fa6";
import { FaCar, FaCamera, FaShareAlt, FaFont, FaHeart, FaRegHeart, FaComment, FaTrash, FaEdit, FaEllipsisH } from "react-icons/fa";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { FiMoreHorizontal } from "react-icons/fi";

const categories = [
  { icon: <HiFire />, label: "Trending", color: "#F7630C" },
  { icon: <BiSolidMoviePlay />, label: "Movies", color: "#C11759" },
  { icon: <FaFaceSmileWink />, label: "Awesome", color: "#ECC21A" },
  { icon: <FaCar />, label: "Car", color: "#3A82D4" },
  { icon: <PiDotsThreeCircleFill />, label: "See More", color: "#C11759" },
];

type Comment = {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
};

type Post = {
  id: string;
  message: string;
  font: string;
  media: {
    type: 'image' | 'video' | null;
    url: string | null;
  };
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  createdAt: Date;
  author: {
    name: string;
    avatar: string;
  };
  sharedContent?: string;
};

export default function HomeFeed() {
  const [isPostPopupOpen, setIsPostPopupOpen] = useState(false);
  const [isCommentsPopupOpen, setIsCommentsPopupOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [userText, setUserText] = useState('');
  const [userFont, setUserFont] = useState('sans-serif');
  const [fontMenuVisible, setFontMenuVisible] = useState(false);
  const [chosenFile, setChosenFile] = useState<{type: 'image' | 'video', url: string} | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.startsWith('video/') ? 'video' : 'image';
      setChosenFile({
        type: fileType,
        url: URL.createObjectURL(file)
      });
      setIsPostPopupOpen(true);
    }
  };

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handlePostSubmit = () => {
    if (!chosenFile) {
      alert('Please upload a photo or video first');
      return;
    }

    const newPost: Post = {
      id: generateId(),
      message: userText,
      font: userFont,
      media: {
        type: chosenFile.type,
        url: chosenFile.url
      },
      likes: 0,
      comments: [],
      isLiked: false,
      createdAt: new Date(),
      author: {
        name: "You",
        avatar: "/window.svg"
      },
      sharedContent: chosenFile.type === 'video' ? 'shared a Video' : 'shared a Photo'
    };
    
    setAllPosts([newPost, ...allPosts]);
    resetForm();
  };

  const handleUpdatePost = () => {
    if (!editingPost || !chosenFile) return;
    
    setAllPosts(allPosts.map(post => 
      post.id === editingPost.id ? { 
        ...post, 
        message: userText,
        font: userFont,
        media: {
          type: chosenFile.type,
          url: chosenFile.url
        }
      } : post
    ));
    
    resetForm();
  };

  const resetForm = () => {
    setUserText('');
    setChosenFile(null);
    setIsPostPopupOpen(false);
    setEditingPost(null);
  };

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!postToDelete) return;
    setAllPosts(allPosts.filter(post => post.id !== postToDelete));
    setIsDeleteConfirmOpen(false);
    setPostToDelete(null);
  };

  const handleEditClick = (post: Post) => {
    setUserText(post.message);
    setUserFont(post.font);
    setChosenFile(post.media.url ? {
      type: post.media.type || 'image',
      url: post.media.url
    } : null);
    setEditingPost(post);
    setIsPostPopupOpen(true);
  };

  const toggleLike = (postId: string) => {
    setAllPosts(allPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    setAllPosts(allPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: generateId(),
              text: newComment,
              author: "You",
              createdAt: new Date()
            }
          ]
        };
      }
      return post;
    }));

    setNewComment('');
  };

  const openComments = (postId: string) => {
    setCurrentPostId(postId);
    setIsCommentsPopupOpen(true);
  };

  const sharePost = (postId: string) => {
    alert(`Sharing post ${postId}`);
  };

  return (
    <div className="ml-13">
      <div className="mt-13 flex gap-5 flex-wrap">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="w-[142px] h-[100px] flex flex-col items-center justify-center bg-white rounded-2xl transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center mt-2 justify-center mb-4 text-3xl" style={{ color: cat.color }}>
              {cat.icon}
            </div>
            <h3 className="text-lg text-[#949FB7] mb-1 text-center">{cat.label}</h3>
          </div>
        ))}
      </div>

      <div className="mt-13 w-[570px] bg-white rounded-lg shadow-sm">
        <div className="flex border-b border-gray-100">
          <button className="px-6 py-3 text-[#C11759] font-semibold border-b-2 border-[#C11759]">Make Post</button>
          <button className="px-6 py-3 text-[#949FB7]" onClick={openFileDialog}>Photo or Video Album</button>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            onChange={handleFileSelect} 
            accept="image/*,video/*" 
          />
        </div>

        <div className="flex items-center gap-4 px-6 py-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image src="/window.svg" alt="Profile" width={40} height={40} />
          </div>
          <input
            placeholder="What's on your mind?"
            className="text-[#949FB7] border-none text-base w-full outline-none"
            onFocus={() => setIsPostPopupOpen(true)}
            readOnly
          />
        </div>

        <div className="flex justify-between px-6 pb-4 pt-2">
          <button className="flex items-center gap-2 text-[#C11759] text-sm" onClick={openFileDialog}>
            <FaCamera /> Photo or Video
          </button>
          <button className="flex items-center gap-2 text-[#C11759] text-sm" onClick={() => setIsPostPopupOpen(true)}>
            <FaShareAlt /> Share
          </button>
          <button className="flex items-center gap-2 text-[#C11759] text-sm" onClick={() => setFontMenuVisible(!fontMenuVisible)}>
            <FaFont /> Text
          </button>
        </div>

        {fontMenuVisible && (
          <div className="px-6 pb-4 flex gap-3">
            {['sans-serif', 'serif', 'monospace'].map(font => (
              <button
                key={font}
                onClick={() => setUserFont(font)}
                className="border px-2 py-1 rounded text-sm"
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        )}
      </div>

      {isPostPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] max-h-[80vh] rounded-lg shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-[#949FB7] font-bold">
                {editingPost ? 'Edit Post' : 'Create Post'}
              </h2>
              <button 
                onClick={resetForm} 
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chosenFile ? (
                <>
                  <div className="mb-4 relative">
                    {chosenFile.type === 'video' ? (
                      <video 
                        src={chosenFile.url} 
                        controls 
                        className="w-full max-h-96 rounded object-contain bg-black"
                      />
                    ) : (
                      <img 
                        src={chosenFile.url} 
                        className="w-full max-h-96 rounded object-contain" 
                        alt="Preview" 
                      />
                    )}
                    <button 
                      onClick={() => setChosenFile(null)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                    >
                      ✕
                    </button>
                  </div>
                  <textarea
                    placeholder="Write a caption..."
                    className="w-full text-[#949FB7] h-20 p-2 border rounded mb-4"
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    style={{ fontFamily: userFont }}
                  />
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">Please upload a photo or video first</p>
                  <button 
                    onClick={openFileDialog}
                    className="bg-[#C11759] text-white py-2 px-6 rounded"
                  >
                    Upload Media
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button 
                onClick={resetForm}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={editingPost ? handleUpdatePost : handlePostSubmit}
                className="bg-[#C11759] text-white py-2 px-6 rounded disabled:opacity-50"
                disabled={!chosenFile}
              >
                {editingPost ? 'Update' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Delete Post?</h2>
            <p className="mb-6">Are you sure you want to permanently delete this post?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-6 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isCommentsPopupOpen && currentPostId && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] max-h-[80vh] rounded-lg shadow-lg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Comments</h2>
              <button 
                onClick={() => setIsCommentsPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {allPosts.find(p => p.id === currentPostId)?.comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                    <Image src="/window.svg" alt="User" width={32} height={32} />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="font-medium">{comment.author}</p>
                      <p>{comment.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {comment.createdAt.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border rounded p-2"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment(currentPostId)}
              />
              <button 
                onClick={() => handleAddComment(currentPostId)}
                className="bg-[#C11759] text-white py-2 px-4 rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 w-[570px] space-y-6">
        {allPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    width={48} 
                    height={48} 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-800">{post.author.name}</span>
                    <span className="text-[#C11759] font-medium">{post.sharedContent}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {post.createdAt.toLocaleString('en-US', {
                      weekday: 'long',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              <div className="relative">
                <button className="text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setCurrentPostId(currentPostId === post.id ? null : post.id)}>
                  <FiMoreHorizontal />
                </button>
                {currentPostId === post.id && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => handleEditClick(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                      onClick={() => handleDeleteClick(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Post Link */}
            {post.media.url && post.media.type === 'video' && (
              <div className="mb-2">
                <a href={post.message} className="text-[#C11759] text-base break-all" target="_blank" rel="noopener noreferrer">
                  {post.message}
                </a>
              </div>
            )}
            {/* Post Media */}
            {post.media.url && (
              <div className="w-full rounded-xl overflow-hidden mb-4 relative" style={{ minHeight: '16rem', maxHeight: '16rem' }}>
                {post.media.type === 'video' ? (
                  playingVideoId === post.id ? (
                    <video
                      ref={el => { videoRefs.current[post.id] = el; }}
                      src={post.media.url}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '16rem', maxHeight: '16rem' }}
                      controls
                      autoPlay
                      onEnded={() => setPlayingVideoId(null)}
                    />
                  ) : (
                    <>
                      <video
                        src={post.media.url}
                        className="w-full h-full object-cover"
                        style={{ minHeight: '16rem', maxHeight: '16rem' }}
                        controls={false}
                        poster=""
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                      <button
                        className="absolute inset-0 flex items-center justify-center w-full h-full"
                        onClick={() => setPlayingVideoId(post.id)}
                        style={{ background: 'rgba(0,0,0,0.2)' }}
                        aria-label="Play video"
                      >
                        <div className="bg-[#C11759]/80 rounded-full p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75v10.5l7.5-5.25-7.5-5.25z" />
                          </svg>
                        </div>
                      </button>
                    </>
                  )
                ) : (
                  <img 
                    src={post.media.url} 
                    className="w-full h-full object-cover" 
                    alt="Post content" 
                    style={{ minHeight: '16rem', maxHeight: '16rem' }}
                  />
                )}
              </div>
            )}
            <div className="flex items-center justify-between py-2 px-1 mt-2 mb-2">
              <button 
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-2 text-[#C11759] text-base font-medium"
              >
                <FaHeart className="text-[#C11759]" />
                <span>{post.likes > 1000 ? (post.likes/1000).toFixed(1) + 'k' : post.likes} likes</span>
              </button>
              <button 
                onClick={() => openComments(post.id)}
                className="flex items-center gap-2 text-[#949FB7] text-base font-medium"
              >
                <FaComment />
                <span>Comments ({post.comments.length})</span>
              </button>
              <button 
                onClick={() => sharePost(post.id)}
                className="flex items-center gap-2 text-[#C11759] text-base font-medium"
              >
                <FaShareAlt />
                <span>Share</span>
              </button>
            </div>
            {/* Comment Input */}
            <div className="bg-[#F6F7FA] rounded-xl flex items-center px-4 py-2 mt-2">
              <input
                type="text"
                placeholder="Add your Comments"
                className="flex-1 bg-transparent border-none outline-none text-[#949FB7] text-base"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
              />
              <button 
                onClick={() => handleAddComment(post.id)}
                className="text-[#C11759] text-2xl ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12l15-6m0 0l-6 15m6-15l-15 6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}