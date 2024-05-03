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

const getGroupByName = async (req, res) => {
    try {
        const name = req.params.name;
        const query = await pool.query('select * from groups where name=$1', [name]);
        res.json(query.rows[0]);
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
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { id } = req.params;
        await client.query("DELETE FROM users WHERE group_id = $1", [id]);
        await client.query("DELETE FROM groups WHERE id = $1", [id]);
        await client.query('COMMIT');
        res.json({"message": "Item deleted successfully"});
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err.message);
        res.status(500).json({"error": "An error occurred"});
    } finally {
        client.release();
    }
};

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupByName
};