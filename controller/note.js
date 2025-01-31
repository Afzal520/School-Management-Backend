import Note from "../models/note.js";

// Endpoint to upload a PDF and save it in the database
export const noteController = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        console.log(title,content)
        if (!title || !content) return res.status(404).json({ success: false, message: "required all fields" })
            console.log("Request Body:", req.body); // Logs title, content, author
        console.log("Uploaded File:", req.file);
        const newNote = new Note({
            title,
            content,
            author,
            pdf: req.file.buffer, // Store the PDF buffer
            pdfMimeType: req.file.mimetype, // Store the MIME type
        });

        await newNote.save();
        res.status(201).json({ message: "PDF uploaded and saved successfully", newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload PDF" });
    }
};