const pool = require("../db");

const getAllGroups = async (req, res) => {
  try {
    const allGroups = await pool.query("select * from groups");
    res.json(allGroups.rows);
  } catch (err) {
    console.log(err.message);
  }
};

const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        const groupById = await pool.query("select * from groups where id=$1", [id]);
        res.json(groupById.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const createdGroup = await pool.query("insert into groups(name) values ($1) returning *", [name]);
        res.json(createdGroup.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedGroup = await pool.query("update groups set name=$1 where id=$2 returning *", [name, id]);
        res.json(updatedGroup.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
}

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGroup = await pool.query("delete from groups where id=$1 returning *", [id]);
        res.json({"message": "item deleted successfully"})
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
};