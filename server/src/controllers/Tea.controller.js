const TeaService = require("../services/Tea.service");
const formatResponse = require("../utils/formatResponse");
const isValidId = require("../utils/isValidId");
const reformatId = require("../utils/reformatId");

class TeaController {
  static async getAllTeas(req, res) {
    console.log("Получение всех чаев...");

    try {
      const teas = await TeaService.getAll();

      if (teas.length === 0) {
        return res.status(204).json(formatResponse(204, "No tea found", []));
      }

      res.status(200).json(formatResponse(200, "success", teas));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async getTeaById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid tea ID"));
    }
    try {
      const tea = await TeaService.getById(reformatId(id));
      if (!tea) {
        return res
          .status(404)
          .json(formatResponse(404, `Tea with id ${id} not found`));
      }
      res.status(200).json(formatResponse(200, "success", tea));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async createTea(req, res) {
    const { title, place, img, description, longitude, width } = req.body;

    try {
      const newTea = await TeaService.create({
        title,
        place,
        img,
        description,
        longitude,
        width,
      });
      if (!newTea) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new tea`));
      }
      res.status(201).json(formatResponse(201, "success", newTea));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async updateTea(req, res) {
    const { id } = req.params;
    const { title, place, img, description, longitude, width } = req.body;

    if (!isValidId) {
      return res.status(400).json(formatResponse(400, "Invalid tea ID"));
    }
    try {
      const updateTea = await TeaService.update(+id, {
        title,
        place,
        img,
        description,
        longitude,
        width,
      });
      if (!updateTea) {
        return res
          .status(404)
          .json(formatResponse(404, `Tea with id ${id} not found`));
      }
      res.status(200).json(formatResponse(200, "success", updateTea));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async deleteTea(req, res) {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid tea ID"));
    }
    try {
      const deletedTea = await TeaService.delete(reformatId(id));
      if (!deletedTea) {
        return res
          .status(404)
          .json(formatResponse(404, `Tea with id ${id} not found`));
      }
      res.status(200);
      res
        .status(200)
        .json(formatResponse(200, `Tea with id ${id} successfully deleted`));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = TeaController;
