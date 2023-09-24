import React, { useState, useEffect, useRef } from "react";
import "./Blog.css";
import { AiFillLike, AiOutlineLike, AiFillCloseCircle } from "react-icons/ai";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import axios from "../../axios";
import { useSelector } from "react-redux";
import PostBlog from "./PostBlog";

const Blog = () => {
  const user = useSelector((state) => state);
  console.log(user);

  const [Blogs, setBlogs] = useState([]);

  const [activeBlog, setActiveBlog] = useState(null);
  const [comment, setComment] = useState(false);
  const [input_commnet, setInputComment] = useState("");
  const [postAction,setPostAction]=useState("")

  const [grpJoined,setGroupJoined]=useState(false)
  const [reccomend,setReccomend]=useState(
    [{
      image:"https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png",
      name:"Leisure",
      connected:false
    },
    {
      image:"https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
      name:"Activism",
      connected:false
    },
    {
      image:"https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
      name:"MBA",
      connected:false
    },
    {
      image:"https://static.vecteezy.com/system/resources/thumbnails/007/410/738/small/bearded-man-illustration-in-flat-cartoon-style-free-vector.jpg",
      name:"Philosophy",
      connected:false
    },
    {
      image:"https://previews.123rf.com/images/jemastock/jemastock1810/jemastock181007520/110674087-pop-art-hipster-man-face-with-beard-vector-illustration-graphic-design.jpg",
      name:"Leisure",
      connected:false
    }]
  )

  useEffect(() => {
    const fetchBlogsData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const response = await axios.get("/Blogs/getAllPost",config);
      setBlogs(response.data);
      // console.log(response.data[0]._id);
    };
    fetchBlogsData();
  }, []);

  const openBlog = () => {
      const handleComment = (event) => {
        const { value } = event.target;
        let message = value.replace(/\s{3,}/g, " ");
        if (!/\S/.test(message)) {
          message = message.replace(/\s+/g, "");
        }
        setInputComment(message);
      };

      const postComment = () => {
        if (input_commnet !== "") {
          let newComment = { ...activeBlog };
          let comntObj = {
            text: input_commnet,
            userName: user.details.username,
          };
          newComment.comment.push(comntObj);
          setActiveBlog(newComment);
          setInputComment("");
          editLike_Comment(activeBlog._id,"comment",newComment.comment)
        }
      };
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          // Handle Enter key event here
          postComment();
        }
      };

      const addLike = () => {
        let activeBlogCopy = { ...activeBlog };
        activeBlogCopy.Like.push(user.details._id);
        setActiveBlog(activeBlogCopy);
        editLike_Comment(activeBlog._id,"Like",activeBlogCopy.Like)
      };

      const removeLike = () => {
        let postid= activeBlog._id
        let activeBlogCopy = { ...activeBlog };
        activeBlogCopy.Like = activeBlogCopy.Like.filter(
          (key) => user.details._id != key
        );
        let BlogsCopy = [...Blogs];
        const deleteLike = BlogsCopy.find(Post => Post._id===postid);
        let index=BlogsCopy.indexOf(deleteLike)
        BlogsCopy[index].Like=activeBlogCopy.Like
        setActiveBlog(activeBlogCopy);
        setBlogs(BlogsCopy);
        editLike_Comment(activeBlog._id,"Like",activeBlogCopy.Like)
      };

      const editLike_Comment=(_id,toBeEdit,arr)=>{
        const response = axios.post("/Blogs/editSocial",{_id,toBeEdit,arr});
      }

      return (
        <div className="blogWindow">
          <AiFillCloseCircle
            className="close"
            onClick={() => {
              setActiveBlog(null);
              setComment(false);
              setActiveBlog(null);
            }}
          />
          <div>
            <div className="image_Like_comment">
              <img src={activeBlog.coverImageLink} alt="" />
              <div className="reactionField">
                {activeBlog.Like.includes(user.details._id) ? (
                  <AiFillLike
                    style={{ cursor: "pointer" }}
                    onClick={removeLike}
                  />
                ) : (
                  <AiOutlineLike
                    style={{ cursor: "pointer" }}
                    onClick={addLike}
                  />
                )}
                {comment ? (
                  <>
                    <FaCommentDots
                      style={{ cursor: "pointer" }}
                      onClick={() => setComment(false)}
                    />

                    <div className="Comments_section">
                      <AiFillCloseCircle
                        className="close"
                        onClick={() => setComment(false)}
                      />
                      <div className="comments">
                        <h5>Comments</h5>
                        {activeBlog.comment &&
                          activeBlog.comment
                            .slice()
                            .reverse()
                            .map((comment) => (
                              <div>
                                <span>{comment.userName}</span>
                                <p>{comment.text}</p>
                              </div>
                            ))}
                      </div>
                      <div className="InputComment">
                        <input
                          value={input_commnet}
                          placeholder="Leave your Comment"
                          type="text"
                          onChange={handleComment}
                          onKeyDown={handleKeyDown}
                        />
                        <FiSend className="send" onClick={postComment} />
                      </div>
                    </div>
                  </>
                ) : (
                  <FaRegCommentDots
                    style={{ cursor: "pointer" }}
                    onClick={() => setComment(true)}
                  />
                )}
              </div>
            </div>
            <div className="aaboutPost_aboutUser">
              <div className="aboutPost">
                <h6>{activeBlog.tittle}</h6>
                <p style={{whiteSpace:"pre-wrap"}}>{activeBlog.content}</p>
              </div>
              <div className="aboutUser">
                <img src={activeBlog.createdBy.profilePitchure} alt="" />
                <p>{activeBlog.createdBy.username}</p>
              </div>
            </div>
          </div>
        </div>
      );
  };

  const [postBlogWindow, setPostBlogWindow] = useState(false);
  const handleSubmitBlog =async (BlogDetail,_id) => {
    if(postAction==="post"){
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const response =await axios.post("/Blogs/createPost", BlogDetail,config);
      let BlogsCopy = [...Blogs];
      BlogsCopy.push(BlogDetail);
      setBlogs(BlogsCopy);
    }else{
      let edit_Post=BlogDetail
      edit_Post._id=_id
      const response = axios.post("/Blogs/editPost", edit_Post);
      let BlogsCopy = [...Blogs];
      const render_edit = BlogsCopy.find(Post => Post._id===_id);
      let index=BlogsCopy.indexOf(render_edit)
      BlogsCopy[index]=edit_Post
      setBlogs(BlogsCopy);
    }
    
    setPostBlogWindow(false);
  };
  const handleBlogWindow = () => {
    setPostBlogWindow(false);
  };


 

  const handlePostOption = async(name,cBlog) => {
   
    if (name === "edit") {
      setActiveBlog(cBlog)
      setPostBlogWindow(true);
      setPostAction(name)
    }else if(name==="delete"){
      const response = await axios.post("/Blogs/deletePost",{_id:cBlog._id});
      let BlogsCopy = [...Blogs];
      let index=BlogsCopy.indexOf(cBlog)
      console.log(index);
      BlogsCopy =BlogsCopy.slice(index+1)
      
      setBlogs(BlogsCopy);
    }
  };

  return (
    <div style={activeBlog && { overflowY: "none" }} className="blogPage">
      <div className="CoverPage">
        <h2>Computer Engineering</h2>
        <span>142,765 Computer Engineers follow this</span>
         
        {/* <img src={CoverImage} alt="" /> */}
      </div>
      <div className="buttonWrapper">
        <div className="postClassification">
          <button>All Posts</button>
          <button>Technologies</button>
          <button>News</button>
          <button>Education</button>
          <button>Job</button>
        </div>
        <div className="actionButton">
          <button onClick={() => {setPostBlogWindow(true);setPostAction("post")}}
        className="postBlogWindowBtn">Write a Post <i class="fa-solid fa-chevron-down"></i></button>
        <button style={grpJoined?{
          background:"transparent",
          border:"1px solid #6A6A6B",
          color:"#6A6A6B"
        }:{}} onClick={()=>{user.details===true?(window.location.href="/login"):setGroupJoined(!grpJoined)}}>
          {!grpJoined?<>
            <i class="fa-solid fa-user-plus"></i> Join Group 
          </>:
          <> 
             Leave Group <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </>}
          
          
          </button>
        </div>

      </div>



      <div className="grpWrapper">
      {Blogs.length>0?<div className="Blogs">
        {Blogs.slice()
          .reverse()
          .map((key,index) => (
            <div className="blog">
              {/* <BiDotsHorizontal className="optionsicon" /> */}
              <i  class="fa-solid fa-bars optionsicon"></i>
              {
                key?.createdBy?._id==user?.details?._id&&<div className="options">
                <p name="edit" onClick={() => handlePostOption("edit",key)}>
                  Edit Post
                </p>
                <p name="delete" onClick={(e) => {handlePostOption("delete",key)}}>
                  Delete Post
                </p>
              </div>
              }
              
              <img
                onClick={() => setActiveBlog(key)}
                src={key.coverImageLink}
                alt=""
              />
              <div
                onClick={() => setActiveBlog(key)}
                className="TittleSubtittle"
              >
                <p><b>{key.type}</b></p>
                <h6>{key.tittle.substring(0, 70)}</h6>
                <p>{key.content.substring(0, 70)}....</p>
              </div>
              
              <div className="aboutUser">
                <img src={key?.createdBy?.profilePitchure} alt="" />
                <p>{key?.createdBy?.username}</p>
                {/* <p style={{marginLeft:"auto"}}>{key.Like.length} Likes</p> */}
                <p style={{marginLeft:"auto",opacity:0.7}}>{key.Like.length} Likes , {key.comment.length} comments</p>
              </div>
              <p></p>
            </div>
          ))}
      </div>:<h5>No Blogs Yet..</h5>}

      <div className="locationWrapper">
        <button>
          <i class="fa-solid fa-location-dot"></i>  
          Noida, India
          <i className="pen" class="fa-solid fa-pen pen"></i>
        </button>  
        <p><i class="fa-solid fa-circle-exclamation"></i> Your location will help us serve better and extend a personalised experience.</p>
        {grpJoined&&<div className="recommendWrapper">
          <h6><i class="fa-regular fa-thumbs-up"></i> Recommended Groups</h6>
          {
            reccomend.map((key,index)=><div className="profile">
              <img src={key.image} alt="" />
              <p>{key.name}</p>
              <button className={reccomend[index].connected&&"connected"} onClick={()=>{
                !user.details?(window.location.href="/login"):setReccomend(
                  prevValue=>[...prevValue,reccomend[index].connected=!reccomend[index].connected]
                )
              }}>{key.connected?"connected":"connect"}</button>
            </div>)
          }

          <span>...see more</span>
        </div>}
      </div>
      </div>

      

      {activeBlog != null && openBlog()}
      {postBlogWindow && (
        <PostBlog
          user={user}
          handleSubmitBlog={handleSubmitBlog}
          closeWindow={handleBlogWindow}
          BlogDetail={activeBlog}
        />
      )}
    </div>
  );
};

export default Blog;
