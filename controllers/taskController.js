const Task = require("./../model/Task")

// create a task
const createTask = async (req, res) => {
    const { title, description } = req.body

    if (!title) {
        return res.status(400).json({ error: "Title is required" })
    }

    const task = await Task.create({
        title,
        description,
        owner: req.user._id
    })

    res.status(200).json({ success: true, task })
}


const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })

        res.status(200).json({ success: true, tasks })
    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" })

    }
}

const getTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const ownerId = req.user._id
        const task = await Task.findOne({ owner: ownerId, _id: taskId })

        res.status(200).json({ success: true, task })

    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" })
    }
}


const updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        // ✅ Find task AND verify ownership in one query
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user._id },  // 🔒 owner check!
            { title, description, completed },
            { new: true, runValidators: true }             // return updated doc
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Task not found or not yours',
            });
        }

        res.json({ success: true, task });
    } catch (err) {
        console.error('updateTask error:', err);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        const ownerId = req.user._id

        const task = await Task.findById({ _id: taskId })
        console.log(task)

        if (!task) return res.status(404).json({ error: "Task not found" })

        await Task.findOneAndDelete({ _id: task._id, owner: ownerId })

        res.status(200).json({ success: true, message: "Task Deleted" })
    } catch (error) {
        res.status(500).json({ error: "Error fetching tasks" })
    }
}


module.exports = { createTask, getTask, getTasks, updateTask, deleteTask }