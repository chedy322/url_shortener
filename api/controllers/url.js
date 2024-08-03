const ShortUrl = require('../model/url');
const mongoose = require('mongoose');
const shortid = require('shortid');

const getAllurl = async (req, res) => {
    try {
        const urls = await ShortUrl.find({}).sort({ createdAt: 'desc' }); // Corrected sorting
        return res.status(200).render('../../client/index.ejs', { urls }); // Corrected render path and status code
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to get all URLs' }); // Corrected error message format
    }
};

const CreateUrl = async (req, res) => {
    try {
        const { formUrl } = req.body;
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Default base URL if not provided in env
        const urlCode = shortid.generate();
        const shortUrl = `${baseUrl}/${urlCode}`;
        const urlCreation = {
            original_url: formUrl,
            short_url: shortUrl
        };
        
        const existingUrl = await ShortUrl.findOne({ original_url: formUrl });
        if (existingUrl) {
            return res.status(400).json({ message: 'URL already exists' });
        }

        const createdUrl = await ShortUrl.create(urlCreation);
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to create URL' });
    }
};

const getUrlByid = async (req, res) => {
    try {
        const { url } = req.params;
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        const shortUrl = `${baseUrl}/${url}`
        const existingUrl = await ShortUrl.findOne({ short_url:shortUrl});
        if (!existingUrl) {
            return res.status(404).json({ message: 'URL not found' });
        }
        
        existingUrl.clicks++
        await existingUrl.save();
        return res.redirect(existingUrl.original_url);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to get URL' });
    }
};

module.exports = { getUrlByid, CreateUrl, getAllurl };
