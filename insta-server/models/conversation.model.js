import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
})

export const Conversation = mongoose.model("Conversation", conversationSchema)
