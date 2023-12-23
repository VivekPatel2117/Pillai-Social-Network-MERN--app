const express=require("express");
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const requiredLogin = require("../middlewares/requiredLogin");
const Jwt_secret="rsekbyudhvakysd";
const Studentemail =/^[a-zA-Z]{1,20}[0-9]{2}[a-zA-Z]{2,5}@student\.mes\.ac\.in$/;
const Adminemail =/^[a-zA-Z]{1,20}[0-9]{2}[a-zA-Z]@mes\.ac\.in$/;



router.post("/Student",(req,res)=>{
   const {UserName,Email,Password}=req.body;

    if(!Email||!Password||!UserName){
        res.status(422).json({error:"PLease fill all the feilds"})
    }
    if (Email.match(Studentemail)) {
    USER.findOne({$or:[{Email:Email},{UserName:UserName}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exist with that Email or UserName"})
        }
        bcrypt.hash(Password,8).then((hasedPassword)=>{
            const user=new USER({
                Email,
                UserName,
                Password:hasedPassword
               })
               user.save()
               .then(user=>{res.json({message:"saved successfully"})})
               .catch(err=>{ console.log(err)})
        })
       

    })
   
    }
    else{
        return res.status(422).json({error:"Only Student Email allowed"})
    }
})


router.post("/Admin",(req,res)=>{
    const {UserName,Email,Password}=req.body;

    if(!Email||!Password||!UserName){
        res.status(422).json({error:"PLease fill all the feilds"})
    }
    // if (Adminemail.test(Email)) {
    USER.findOne({$or:[{Email:Email},{UserName:UserName}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exist with that Email or UserName"})
        }
        bcrypt.hash(Password,8).then((hasedPassword)=>{
            const user=new USER({
                Email,
                UserName,
                Password:hasedPassword
               })
               user.save()
               .then(user=>{res.json({message:"saved successfully"})})
               .catch(err=>{ console.log(err)})
        })
       

    })
   
    // }
    // else{
    //     return res.status(422).json({error:"Only Faculty Email allowed"})
    // }
})



router.post("/SignIn",(req,res)=>{  
    const {email,Password}=req.body;
     if(!email||!Password){
         res.status(422).json({error:"PLease fill all the feilds"})
     }
     
        USER.findOne({Email:email}).then((savedUser)=>{
            if(!savedUser){
                return res.status(422).json({error:"Email Does Not Registered"})
            }
            console.log(savedUser);
           bcrypt.compare(Password,savedUser.Password).then((match)=>{
               if(match){
                const token=jwt.sign({_id:savedUser.id},Jwt_secret)
                const { _id,Email, UserName } = savedUser
                res.json({ token, user: { _id,Email, UserName } })

                console.log({ token, user: { _id, Email, UserName } })
 
                
                // localStorage.setItem("token");
                // console.log(localStorage.getItem("token"));
                console.log(jwt)
                // console.log(match);
                //    return res.status(200).json({message:"Signed In sucessfully"})
               
               
           }else{
                    return res.status(422).json({error:"Invalid password"})
                  }
        
    
        })

    })
       
        
    
//      else {
     
//      ADMIN.findOne({Email:email}).then((savedUser)=>{
//         if(!savedUser){
//             return res.status(422).json({error:"Email Does Not Registered"})
//         }
//         console.log(savedUser);
//        bcrypt.compare(Password,savedUser.Password).then((match)=>{
//            if(match){
//                // console.log(match);
//             //    return res.status(200).json({message:"Signed In sucessfully"})
//             const token=jwt.sign({_id:savedUser.id},Jwt_secret)
//             const { _id,Email} = savedUser
//             res.json({ token, user: { _id,Email} })

//             console.log({ token, user: { _id, Email } })
//             // console.log(token);
//             // res.json(token)
              
//            }else{
//                return res.status(422).json({error:"Invalid password"})
//            }
//        })
//        .catch(err=>console.log(err))

//      })
// }
   
 

})

module.exports=router;