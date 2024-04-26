const pool = require("../db");

const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = 10;

const getAllusers = async (req, res) => {
  try {
    const allGroups = await pool.query("select * from users where role!='admin'");
    res.json(allGroups.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getAllusersByGroup = async (req, res) => {
  try {
    const groupName = req.query.groupName;
    const allGroups = await pool.query(
      "SELECT users.* FROM users INNER JOIN groups ON users.group_id = groups.id WHERE groups.name = $1",
      [groupName]
    );
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

const signUp = async (req, res) => {
  try {
      const hash = await bcrypt.hash(req.body.password.toString(), salt);
      const values = [
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hash
      ];
      pool.query("insert into users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)", values);
      res.json({ status: "Success" });
  } catch (err) {
      console.error(err.message);
      res.json({ error: "An error occurred while signing up" });
  }
}

const logIn = async (req, res) => {
  try {
    const query = await pool.query("select * from users where email=$1", [req.body.email]);
    const user = query.rows[0];

    if (user) {
      const match = await bcrypt.compare(req.body.password.toString(), user.password);
      if (match) {
        const email = user.email;
        const token = jwt.sign({email}, "jwt-secret-key", {expiresIn: '1h'});
        res.cookie('token', token);
        res.json({ status: "Success" });
      } else {
        res.json({ error: "Password not matched" });
      }
    } else {
      res.json({ error: "No email existed" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
}

const getUniqueUserByToken = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.json({error: "You are not authenticated"});
  } else {
    jwt.verify(token, "jwt-secret-key",async (err, decoded) => {
      if (err) {
        res.json({error: "Token is not correct"});
      } else {
        const email = decoded.email;
        const query = await pool.query("select * from users where email=$1", [email]);
        const currentUser = query.rows[0];
        res.json({status: "Success", email: email, first_name: currentUser.first_name, last_name: currentUser.last_name, role: currentUser.role, group_id: currentUser.group_id});
      }
    })
  }
}

const logOut = async (req, res) => {
  res.clearCookie('token');
  res.json({status: "Success"});
}

module.exports = {
  getAllusers,
  getAllusersByGroup,
  getUniqueUser,
  updateUser,
  deleteUser,
  signUp,
  logIn,
  getUniqueUserByToken,
  logOut
}