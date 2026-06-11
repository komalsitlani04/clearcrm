const router = require('express').Router();
const Lead = require('../models/Lead');
const protect = require('../middleware/auth');

// Get all leads (with search + filter)
router.get('/', protect, async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = { owner: req.user.id };

    if (status && status !== 'All') query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single lead
router.get('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user.id });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create lead
router.post('/', protect, async (req, res) => {
  try {
    const lead = await Lead.create({ ...req.body, owner: req.user.id });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update lead
router.put('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete lead
router.delete('/:id', protect, async (req, res) => {
  try {
    await Lead.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add note to lead
router.post('/:id/notes', protect, async (req, res) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user.id });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    lead.notes.push({ text: req.body.text });
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get dashboard stats
router.get('/stats/summary', protect, async (req, res) => {
  try {
    const statuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
    const counts = await Promise.all(
      statuses.map((s) =>
        Lead.countDocuments({ owner: req.user.id, status: s })
      )
    );

    const stats = {};
    statuses.forEach((s, i) => (stats[s] = counts[i]));
    stats.Total = counts.reduce((a, b) => a + b, 0);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;