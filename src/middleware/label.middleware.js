const labelService = require("../service/label.service");

const verifyLabelsExist = async (ctx, next) => {
  const { labels } = ctx.request.body;
  const labelsArray = []
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    const labelObject = { name }
    if (result) {
      labelObject.id = result.id
    } else {
      const result = await labelService.create(name)
      labelObject.id = result.insertId
    }
    labelsArray.push(labelObject)
  }
  ctx.labels = labelsArray
  await next()
};

module.exports = {
  verifyLabelsExist,
};
