
// actions
const actions = require('../actions');

const appRouter = (app) => {
  app.get('/update', async (req, res) => {
    const response = await actions.update();

    res.status(200).send(response);
  });

  app.post('/error', async (req, res) => {
    const response = await actions.error(req.body);

    res.status(200).send(response);
  });
};

module.exports = appRouter;
