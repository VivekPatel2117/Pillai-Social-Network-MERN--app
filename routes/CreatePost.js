const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requiredLogin=require('../middlewares/requiredLogin')
const POST=mongoose.model("POST");
const USER=mongoose.model("USER");
const NOTICE =mongoose.model("NOTICE");
const AWARD=mongoose.model("AWARD");
const app=express();






//Route
router.post("/CreatePost",requiredLogin,(req,res)=>{
    const { body, pic } = req.body;
    console.log(pic)
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user)
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user,
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => console.log(err))
})
router.get("/allposts",(req,res)=>{
    POST.find()
    .populate("postedBy","_id UserName Photo")
    .sort("-createdAt")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
    

})

router.put("/like", requiredLogin, async (req, res) => {
    try {
      const result = await POST.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { likes: req.user._id },
        },
        {
          new: true,
        }
      )
        .populate("postedBy", "_id UserName Photo")
        .exec();
  
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err.message });
    }
  }); 
router.put("/unlike", requiredLogin, async (req, res) => {
    try {
      const result = await POST.findByIdAndUpdate(
        req.body.postId,
        {
          $pull: { likes: req.user._id },
        },
        {
          new: true,
        }
      )
        .populate("postedBy", "_id UserName Photo")
        .exec();
  
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err.message });
    }
  });
  router.put("/comment", requiredLogin, async (req, res) => {
    try {
      const comment = {
        comment: req.body.text,
        postedBy: req.user._id,
      };
  
      const result = await POST.findByIdAndUpdate(
        req.body.postId,
        {
          $push: { comments: comment },
        },
        {
          new: true,
        }
      )
        .populate("comments.postedBy", "_id UserName")
        .populate("postedBy", "_id UserName Photo")
        .exec();
  
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err.message });
    }
  });



  
router.put("/likeAward", requiredLogin, async (req, res) => {
  try {
    const result = await AWARD.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("postedBy", "_id UserName Photo")
      .exec();

    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}); 
router.put("/unlikeAward", requiredLogin, async (req, res) => {
  try {
    const result = await AWARD.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("postedBy", "_id UserName Photo")
      .exec();

    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});
router.put("/commentAward", requiredLogin, async (req, res) => {
  try {
    const comment = {
      comment: req.body.text,
      postedBy: req.user._id,
    };

    const result = await AWARD.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id UserName")
      .populate("postedBy", "_id UserName Photo")
      .exec();

    res.json(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});


router.post("/award",requiredLogin,(req,res)=>{
  const { body, pic, category} = req.body;
  console.log(body+"  "+pic+"  "+category);
  if (!body || !pic || !category) {
      return res.status(422).json({ error: "Please add all the fields" })
  }
      //  const user=req.user;
       console.log(req.user);
       USER.findById(req.user._id).then((adminData) => {
      if (adminData) {
        const emailRegex =/^[a-zA-Z]{1,20}@mes\.ac\.in$/;
          const AdminEmail=adminData.Email;
          console.log("Email:", adminData.Email);
          console.log("Regex Test:", emailRegex.test(adminData.Email));
        console.log(emailRegex.test(adminData.Email));



      if(!emailRegex.test(AdminEmail)){
            return res.status(401).json({error:"Only Faculty can post notices"});
          }else{
          const award = new AWARD({
              body,
              photo: pic,
              category,
              postedBy: req.user
          })
          award.save().then((result) => {
              return res.json({ award: result })
          }).catch(err => console.log(err))
          if(award){
          console.log(award);
          return res.status(401).json({found: "adminData" });
          }
          else{
              console.log("ERROR");
          }
          return res.status(401).json({found: "adminData" });
    }
      } 
  })   
});



router.get("/AwardsAllPosts",(req,res)=>{
    AWARD.find()
    .populate("postedBy","_id UserName Photo")
    .sort("-createdAt")
    .then(posts=>res.json(posts))
    .catch(err=>console.log(err))
})
router.get("/categoryAcademic",(req,res)=>{
  AWARD.find({ category: 'Academic' })
  .populate("postedBy","_id UserName Photo")
  .sort("-createdAt")
  .then(posts=>res.json(posts))
  .catch(err=>console.log(err))
})

router.get("/categoryAssociation",(req,res)=>{
  AWARD.find({ category: 'Association' })
  .populate("postedBy","_id UserName Photo")
  .sort("-createdAt")
  .then(posts=>res.json(posts))
  .catch(err=>console.log(err))
})

router.get("/categorysports",(req,res)=>{
  AWARD.find({ category: 'Sports' })
  .populate("postedBy","_id UserName Photo")
  .sort("-createdAt")
  .then(posts=>res.json(posts))
  .catch(err=>console.log(err))
})

router.get("/categoryPerformingArts",(req,res)=>{
  AWARD.find({ category: 'PerformingArts' })
  .populate("postedBy","_id UserName Photo")
  .sort("-createdAt")
  .then(posts=>res.json(posts))
  .catch(err=>console.log(err))
})
router.get("/myposts",requiredLogin,(req,res)=>{
    POST.find({postedBy:req.user._id})
    .populate("postedBy","_id UserName Photo")
    .sort("-createdAt")
    .then(myposts=>{
        res.json(myposts)
    })
})
// Api to delete post
router.delete("/deletePost/:postId", requiredLogin, async (req, res) => {
  try {
      const post = await POST.findOne({ _id: req.params.postId }).populate("postedBy", "_id");

      if (!post) {
          return res.status(422).json({ error: "Post not found" });
      }

      if (post.postedBy._id.toString() !== req.user._id.toString()) {
          return res.status(401).json({ error: "Unauthorized access" });
      }

      await POST.deleteOne({ _id: req.params.postId });

      res.json({ message: "Successfully deleted" });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/myfollwingpost", requiredLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id UserName Photo")
        .populate("comments.postedBy", "_id UserName Photo")
        .sort("-createdAt")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})




router.post("/Notice",requiredLogin,(req,res)=>{
  const { body, pic} = req.body;
  if (!body || !pic ) {
      return res.status(422).json({ error: "Please add all the fields" })
  }
       const user=req.user;
       USER.findById(user._id).then((adminData) => {
      if (adminData) {
        const emailRegex =/^[a-zA-Z]{1,20}@mes\.ac\.in$/;
          console.log(adminData.Email);

      if(!emailRegex.test(adminData.Email)){
            return res.status(401).json({error:"Only Faculty can post notices"});
          }else{
          const notice = new NOTICE({
              body,
              photo: pic,
              postedBy: req.user
          })
          notice.save().then((result) => {
              return res.json({ notice: result })
          }).catch(err => console.log(err))
          if(notice){
          console.log(notice);
          return res.status(401).json({found: "adminData" });
          }
          else{
              console.log("ERROR");
          }
          return res.status(401).json({found: "adminData" });
    }
      } 
  })   
});

router.get("/NoticeAllPosts",(req,res)=>{
  NOTICE.find()
  .populate("postedBy","_id UserName Photo")
  .sort("-createdAt")
  .then(posts=>res.json(posts))
  .catch(err=>console.log(err))
})


module.exports=router