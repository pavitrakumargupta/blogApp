const router=require("express").Router() 
const {genrateOtp,createUser,authUser,allUser,ForgotPassword,updateProfile,getUserbyId,cronJob}=require("../controllers/userDetails")
const {createPost,getAllPost,editPost,deletePost,editLike_Comment}=require("../controllers/handlePost")
const { protect } = require("../middleware/authMiddleware");






// handle User
router.post("/User/genrateOtp",genrateOtp)
router.post("/User/createUser",createUser);
router.post("/User/authUser",authUser)
router.route("/User/allUser").get(protect,allUser)
 
router.post("/forgotPassword",ForgotPassword)
router.post("/updateProfile",updateProfile)
router.get("/getUserbyId",getUserbyId)
router.get("/cronJobrun",cronJob)



// handlePost
router.route("/Blogs/createPost").post(protect,createPost) 
router.route("/Blogs/getAllPost").get(getAllPost)
router.post("/Blogs/editPost",editPost) 
router.post("/Blogs/deletePost",deletePost)
router.post("/Blogs/editSocial",editLike_Comment)

// export
module.exports=router; 