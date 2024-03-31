const pool = require("./conc");

const getAllusers = async (req, res) => {
  try {
    const allGroups = await pool.query("select * from users");
    res.json(allGroups.rows);
  } catch (err) {
    console.log(err.message);
  }
};
const getUniqueUser=async(req,res)=>{
    const {id}= req.query
    const UniqueUser=await pool.query("Select * from users where id=$1",[id]);
    res.json(UniqueUser.rows[0]);
}
const InsertUser=async(req,res)=>{
    const{id}=req.body;
    const{firstname}=req.body
    const{lastname}=req.body
    const{email}=req.body
    const {password}=req.body;
    const {role}=req.body;
    const Insert=await pool.query("Insert into users values($1,$2,$3,$4,$5,$6) returning *",[id,firstname,lastname,email,password,role])
    res.json(Insert.rows[0])
}

const updateUser=async(req,res)=>{
    const {id}=req.query;
    const  {firstname,lastname,email,password,role}=req.body;
    const Update=await pool.query("Update users set first_name=1$,last_name=2$,email=3$,password=4$,role=5$ where id=6$ returning*",[firstname,lastname,email,password,role,id]);
    res.json(Update.rows[0]);


}
const Delete=async(req,res)=>{
      const {id}=req.query;
      const Delete=await pool.query("Delete from users where id=$1 returning *",[id]);
      res.json({message:"Deleted"});
}

module.exports={getAllusers,getUniqueUser,InsertUser,Delete,updateUser};