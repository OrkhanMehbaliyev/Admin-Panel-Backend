const fs = require("fs");
const util = require("util");
const path = require("path");
const generateId = require("../utils/id-generator");
const { DATABASE_TABLE_KEYS } = require("../helpers/enums");
const {
  SUCCESS_GET_MESSAGE,
  SUCCESS_POST_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
} = require("../helpers/messages");
const { SuccessResponse } = require("../utils/response");

const parentFolderPath = path.join(__dirname, "..");
const databasePath = path.join(parentFolderPath, "database/db.json");
const readFileAsync = util.promisify(fs.readFile);
const writeToFileAsync = util.promisify(fs.writeFile);

const getJSONFromDB = async () => {
  const allDataPlain = await readFileAsync(databasePath);
  const allDataJSON = JSON.parse(allDataPlain);
  return allDataJSON;
};

const writeJSONToDB = async (data) => {
  await writeToFileAsync(databasePath, JSON.stringify(data, null, 2));
};

const createModel = async (model, tableKey) => {
  const allData = await getJSONFromDB();
  const newModel = { id: generateId(allData[tableKey]), ...model };
  if (!allData[tableKey]) allData[tableKey] = [];
  allData[tableKey].push(newModel);
  await writeJSONToDB(allData);
  return newModel;
};

/**
 *
 * @returns {Response}
 */
const getData = async (tableKey) => {
  const allData = await getJSONFromDB();
  return allData[tableKey];
};

/**
 *
 * @param {any} data
 * @returns {Response}
 */
const updateObjectData = async (data, tableKey) => {
  const allData = await getJSONFromDB();
  const prevData = allData[tableKey];
  Object.assign(prevData, data);
  await writeJSONToDB(allData);
};

/**
 *
 * @param {any} data
 * @returns {Response}
 */
const updateArrayData = async (data, tableKey, id) => {
  const allData = await getJSONFromDB();
  let updatedItem = allData[tableKey].find((obj) => obj.id == id);
  // allData[tableKey] = allData[tableKey].filter((obj) => obj.id != id);
  if (updatedItem) {
    updatedItem = Object.assign(updatedItem, data);
    allData[tableKey].map((x) => {
      if (x.id == id) return updatedItem;
      else x;
    });
    await writeJSONToDB(allData);
    return true;
  }
  return false;
};

/**
 *
 * @param {Number} id
 * @param {String} tableKey
 */
const deleteData = async (id, tableKey) => {
  const allData = await getJSONFromDB();
  let deletedItem = allData[tableKey].find((data) => data.id == id);
  if (deletedItem) {
    allData[tableKey] = allData[tableKey].filter((obj) => obj.id != id);
    await writeJSONToDB(allData);
    return true;
  }
  return false;
};

module.exports = {
  getJSONFromDB,
  writeJSONToDB,
  createModel,
  getData,
  updateObjectData,
  updateArrayData,
  deleteData,
};
