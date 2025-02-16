const express=require("express");
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const Jwt_secret="rsekbyudhvakysd";
const Studentemail =/^[a-zA-Z]{1,20}[0-9]{2}[a-zA-Z]{2,5}@student\.mes\.ac\.in$/;
const Adminemail =/^[a-zA-Z]{1,20}[0-9]{2}[a-zA-Z]@mes\.ac\.in$/;
var ResetEmail="vivekp22it@student.mes.ac.in";


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
    var otp=Math.floor(1000 + Math.random() * 9000);
    
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
               .then(user=>{
                res.json({message:"Check your mail box to move further"})})
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
       
        
 
})

router.post("/googleLogin", (req, res) => {
    const { email_verified, email,clientId, UserName, Photo } = req.body
    if (email_verified) {
        USER.findOne({ Email: email }).then((savedUser) => {
            if (savedUser) {
                const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
                const { _id,Email, UserName } = savedUser
                res.json({ token, user: { _id, Email, UserName } })
                console.log({ token, user: { _id,Email, UserName } })
            } else {
                const password = email + clientId
                const user = new USER({
                    
                    Email,
                    UserName,
                    Password: password,
                    Photo
                })

                user.save()
                    .then(user => {
                        let userId = user._id.toString()
                        const token = jwt.sign({ _id: userId }, Jwt_secret)
                        const { _id, name, email, userName } = user

                        res.json({ token, user: { _id, name, email, userName } })

                        console.log({ token, user: { _id, name, email, userName } })
                    })
                    .catch(err => { console.log(err) })

            }

        })
    }
})
router.post("/forgotPass", (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ error: "Email not provided" });
    }

    USER.findOne({ Email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "vivekp22it@student.mes.ac.in",
                    pass: "yitb regd hlqn ytaa",
                     },
            });

            transporter.sendMail({
                from: 'Pillai Reset Password <vivekp22it@student.mes.ac.in>',
                to: email, // Sending email to the user who requested password reset
                subject: "Password Reset",
                html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Password Reset</title>
                    </head>
                    <body>
                        <h2>Password Reset</h2>
                        <p>If you are trying to reset your password, please click the link below:</p>
                        <p><a href="http://localhost:5000ResetPass">Reset Password</a></p>
                    </body>
                    </html>
                    `,
            });

            res.status(200).json({ message: "Email sent successfully" });
            ResetEmail=email;
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        });
    });
    router.post("/reset", (req, res) => {
        const newPassword = req.body.password; // Assuming pass is the new password
        // const resetEmail = req.body.ResetEmail; // Assuming ResetEmail is the email of the user whose password is being reset
        USER.findOne({ Email: ResetEmail}).then((savedUser) => {
            if (!savedUser) {
                return res.status(404).json({ error: "User not found" });
            } else {
                bcrypt.hash(newPassword, 8).then((hashedPassword) => {
                    savedUser.Password = hashedPassword;
                    
                    // Save the updated user object with the new hashed password
                    savedUser.save().then(() => {
                        console.log("Password updated successfully");
                        // Optionally, send a response indicating success
                        res.json({ message: "Password updated successfully" });
                    }).catch((error) => {
                        console.error("Error saving user with new password:", error);
                        res.status(500).json({ error: "Internal server error" });
                    });
                }).catch((error) => {
                    console.error("Error hashing password:", error);
                    res.status(500).json({ error: "Internal server error" });
                });
            }
        });
    });
    

module.exports=router;