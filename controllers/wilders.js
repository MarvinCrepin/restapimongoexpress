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

    const result = WilderModel.findByIdAndUpdate(req.params.id, req.body, options);
    result
      .then((result) => res.send(result))
      .catch((err) => 
        res.json({ success: false, result: err }));
  },

  delete: (req, res) => {
    const id = req.params.id;
    const data = WilderModel.findByIdAndDelete(id);

    data
      .then((result) => res.send(`Document with ${data.name} has been deleted..`))
      .catch((err) => res.json({ success: false, result: err }));

  },
};
