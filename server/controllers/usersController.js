const pool = require("../db");

const getAllusers = async (req, res) => {
  try {
    const allGroups = await pool.query("select * from users");
    res.json(allGroups.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getUniqueUser = async(req,res)=>{
    const { id } = req.params;
    const uniqueUser = await pool.query("select * from users where id=$1", [id]);
    res.json(uniqueUser.rows[0]);
};

const insertUser = async (req,res) => {
    const { first_name, last_name, email, password, role, group_id } = req.body;
    const insertedUser = await pool.query("insert into users (first_name, last_name, email, password, role, group_id) values ($1,$2,$3,$4,$5,$6) returning *", [first_name, last_name, email, password, role, group_id]);
    res.json(insertedUser.rows[0])
};

const updateUser = async (req,res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, role, group_id} = req.body;
    const updatedUser = await pool.query("update users set first_name=$1, last_name=$2, email=$3, password=$4, role=$5, group_id=$6 where id=6$ returning *",[first_name, last_name, email, password, role, group_id, id]);
    res.json(updatedUser.rows[0]);
};

const deleteUser = async (req,res) => {
      const { id } = req.params;
      const deletedUser = await pool.query("delete from users where id=$1 returning *",[id]);
      res.json({message:"Deleted"});
};

module.exports = {
  getAllusers,
  getUniqueUser,
  insertUser,
  updateUser,
  deleteUser
}