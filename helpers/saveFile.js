const fs = require('fs');
const file = './data/data.json';

const saveData = (data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, '\t'));
}

const leerData = () => {
  if (!fs.existsSync(file)) {
    return null;
  }
  const info = fs.readFileSync(file, { encoding: 'utf-8' });
  const data = JSON.parse(info);
  
  return data;
}

module.exports = { saveData, leerData }