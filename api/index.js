const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const connectionOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

const MappingSchema = new mongoose.Schema({
    uuid: { type: String, unique: true },
    slug: String,
    type: String
});
const Mapping = mongoose.models.Mapping || mongoose.model('Mapping', MappingSchema);

async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
}

app.post('/api/get-id', async (req, res) => {
    try {
        await connectDB();
        const { slug, type } = req.body;
        if (!slug || !type) return res.status(400).json({ error: 'Slug/Type diperlukan' });

        let data = await Mapping.findOne({ slug, type });
        if (!data) {
            data = await Mapping.create({ uuid: uuidv4(), slug, type });
        }
        return res.json({ uuid: data.uuid });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

app.get('/api/get-slug/:uuid', async (req, res) => {
    try {
        await connectDB();
        const data = await Mapping.findOne({ uuid: req.params.uuid });
        if (data) return res.json(data);
        return res.status(404).json({ error: 'UUID tidak ditemukan' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

app.get('/api/health', async (req, res) => {
    try {
        await connectDB();
        res.json({ status: 'OK', database: 'Connected', timestamp: new Date().toISOString() });
    } catch (e) {
        res.status(500).json({ status: 'Error', message: e.message });
    }
});

module.exports = app;
