const WilderModel = require("../models/Wilder");

module.exports = {
  create: (req, res) => {
    WilderModel.init().then(() => {
      const wilder = new WilderModel(req.body);
      wilder
        .save()
        .then((result) => res.json({ success: true, result: result }))
        .catch((err) =>  res.json({ success: false, result: err }));
    });
  },

  read: (req, res) => {
    const data = WilderModel.find();
    data
      .then((result) => res.json({ success: true, result: result }))
      .catch((err) => res.json({ success: false, result: err }));
  },

  update: (req, res) => {
    const options = { new: true };
    // On utilise la méthode findByIdAndDelete afin de retrouver le document et le supprimer
    // On lui passe en paramètre l'id, le payload (les éléments du document à mettre à jour) ainsi qu'un tableau d'options optionnel
    const result = WilderModel.findByIdAndUpdate(req.params.id, req.body, options);
    result
      .then((result) => res.send(result))
      .catch((err) => 
        res.json({ success: false, result: err }));
  },

  delete: (req, res) => {
    const id = req.params.id;
    // On utilise la méthode findByIdAndDelete afin de retrouver le document et le supprimer
    const data = WilderModel.findByIdAndDelete(id);

    data
      .then((result) => res.send(`Document avec l'id ${id} a bien été supprimé..`))
      .catch((err) => res.json({ success: false, result: err }));
  },
};