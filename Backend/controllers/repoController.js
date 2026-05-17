const Repo = require("../models/Repo");

const createRepositiory = async (req, res) => {
  try {
    const { name, description, vesivelity } = req.body;
    const existingRepo = await Repo.findOne({ name });

    if (existingRepo) {
      return res.status(400).json({
        success: false,
        message: "This name  Repository already exists",
      });
    }

    const repository = {
      name,
      description: description || "",
      vesivelity: vesivelity || false,
      owner: req.userDB._id,
    };

    const repo = await Repo.create(repository);
    

    res.status(201).json({
      success: true,
      message: "Repository created successfully",
      repo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server erro ${error.message}`,
    });
  }
};




const getAllRepositoris = async (req, res) => {
  try {
    const search = req.query.search ;
    const query = {};
   if(search){
            query.$or = [
                {name : {$regex : search, $options : "i"}},
                {description: {$regex : search, $options : "i"}}
            ]
        }

    const repos = await Repo.find({ vesivelity: false, ...query })
      .populate("owner", "name email uid _id")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, repos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const getRepositoryByEmail = async (req, res) => {
  const repoOwner = req.userDB._id;
  try {
    const repos = await Repo.find({ owner: repoOwner }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, repos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {
  createRepositiory,
  getAllRepositoris,
  getRepositoryByEmail,
};