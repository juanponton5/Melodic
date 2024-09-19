const pool = require('../db')
const { trace } = require('../routes/task.routes')

const getAllTasks = async (req, res,next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM tasks');
        res.json(allTasks.rows);

    } catch (error){
        next(error)
    }
};

const getTask = async (req, res,next) => {
    try {
        const { id } = req.params;
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (result.rows.length === 0) 
    return res.status(404).json({
        menssage: ' task not found',

    });
    res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
};

const createTask = async (req, res,next) => {
    const { title, descripcion,precio,cantidad,categoria } = req.body;
    try {
        const result = await pool.query("INSERT INTO tasks (title,descripcion,precio,cantidad,categoria ) VALUES ($1,$2,$3,$4,$5) RETURNING *", 
        [ title, descripcion,precio,cantidad,categoria ]
        );

        res.json(result.rows[0])

    } catch (error) {
        next(error)

    }
}

const deleteTask = async (req, res,next) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE  FROM tasks WHERE id = $1 ', [id]);

    if (result.rowCount.length === 0) 
        return res.status(404).json({
        menssage: ' task not found',
    });

    return res.sendStatus(204);
      
    } catch (error) {
        next(error)
        
    }
};

const updateTask = (req, res) => {
    res.send("update a task");
    
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
};