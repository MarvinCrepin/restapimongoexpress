const WilderModel = require("../models/Wilder");

module.exports = {
  create: (req, res) => {
    WilderModel.init().then(() => {
      const wilder = new WilderModel(req.body);
      wilder
        .save()
        .then((result) => res.json({ success: true, result: result }))
        .catch((err) => res.json({ success: false, result: err }));
    });
  },

  read: async (req, res) => {
  
      const data = await WilderModel.find();
      result = data
      ? data
      : { error: "404", message: "Aucun document trouvé." };
      res.json(result);
  },

  update: async (req, res) => {
    
    const options = { new: true };
    // On utilise la méthode findByIdAndDelete afin de retrouver le document et le supprimer
    // On lui passe en paramètre l'id, le payload (les éléments du document à mettre à jour) ainsi qu'un tableau d'options optionnel
    const data = await WilderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    result = data
      ? data
      : { error: "500", message: "Tu n'as pas ciblé un ID existant" };
    res.json(result);
  },

  delete: async (req, res) => {
    const id = req.params.id;
    // On utilise la méthode findByIdAndDelete afin de retrouver le document et le supprimer

    const data = await WilderModel.findByIdAndDelete(id);
    result = data
      ? data
      : { error: "500", message: "Tu n'as pas ciblé un ID existant" };
    res.json(result);
  },
};
