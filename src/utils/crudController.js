// utils/crudController.js

const mongoose = require("mongoose");

const createCrudController = (Model, fields) => ({
  create: async (req, res) => {
    const data = {};

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    const doc = await Model.create(data);

    res.status(201).json({
      success: true,
      data: doc,
    });
  },

  getAll: async (req, res) => {
    const docs = await Model.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: docs,
    });
  },

  getById: async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const doc = await Model.findById(req.params.id).lean();

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      data: doc,
    });
  },

  update: async (req, res) => {
    const data = {};

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      data: doc,
    });
  },

  remove: async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  },
});

module.exports = createCrudController;