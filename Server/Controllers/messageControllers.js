import { messageModel } from "../Models/messageModel.js";

const handlePost = async (req, res) => {
  try {
    const { adminId, userId, orgId, title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required.." });
    }

    const newMessage = await messageModel.create({
      adminId,
      userId,
      orgId,
      title,
      description,
    });

    res.status(200).json({
      message: "Message created",
      newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await messageModel.find({
      $or: [{ userId: id }, { orgId: id }, { adminId: id }],
    });
    console.log(message);

    if (!message) {
      return res.status(404).json({ message: "No message found..." });
    }

    return res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRes = await messageModel.findByIdAndDelete({ id });

    res.status(200).json({ message: "Message deleted", deleteRes });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const editMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateMsg } = req.body;
    const _id = id;
    const message = await messageModel.find({ _id: id });
    console.log("id..", updateMsg);

    if (!message) {
      return res.status(404).json({
        message: "No message found..",
      });
    } 
    const editMessage = await messageModel.findByIdAndUpdate(
      _id,
      {
        $set: req.body,
      },
      { new: true },
    );

    res.status(200).json({ message: "Message updated", editMessage });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { handlePost, getMessage, deleteMessage, editMessage };
