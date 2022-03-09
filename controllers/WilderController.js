// Wilder Manager
const WilderModel = require("../models/Wilder");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const wilderCheck = async (key = {}) => {
  return (await WilderModel.findOne(key)) ? true : false;
};
module.exports = {
  create: asyncHandler(async (req, res, next) => {
    await WilderModel.init();
    const wilderName = req.body.name;
    if (await wilderCheck({ name: wilderName })) {
      throw createError(
        400,
        `Un utilisateur avec le nom '${wilderName}' est déjà créer.`
      );
    }
    if (!req.body.skills || !req.body.name) {
      throw createError(400, `Le champ 'Skills' ou 'Name' est manquant.`);
    }
    const wilder = new WilderModel(req.body);
    const data = await wilder.save();
    res.json({ success: true, data });
  }),

  read: asyncHandler(async (req, res) => {
    const data = await WilderModel.find({});
    if (!wilderCheck()) {
      throw createError(404, `Aucun wilder trouvé.`);
    }
    res.json({ success: true, data });
  }),

  update: asyncHandler(async (req, res) => {
    // On utilise la méthode findByIdAndDelete afin de retrouver le document et le supprimer
    // On lui passe en paramètre l'id, le payload (les éléments du document à mettre à jour) ainsi qu'un tableau d'options optionnel
    const id = req.params.id;
    if (!req.body.skills || !req.body.name) {
      throw createError(412, `Le nom ou les skills ne sont pas corrects.`);
    }
    if (!(await wilderCheck({ _id: id }))) {
      throw createError(404, `Aucun wilder trouvé.`);
    }
    const data = await WilderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ success: true, data });
  }),

  delete: asyncHandler(async (req, res, next) => {
    // On utilise la méthode findByIdAndDelete afin de retrouver le document et le supprimer
    const id = req.params.id;
    if (!(await wilderCheck({ _id: id }))) {
      throw createError(404, `Aucun wilder trouvé.`);
    }
    const data = await WilderModel.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  }),
};
