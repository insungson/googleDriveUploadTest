const fs = require('fs');
const readline = require('readline');
let rl;

const test = require('./test');


const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const send = (file) => {
  console.log('파일을 보냈습니다');
  test(file);
  rl.close();
};

const SelectFile = (answer) => {
  if(!exist(answer)) {
    console.log('파일이 없습니다 다시 선택해주세요');
    return rl.question('다시 적어주세요', SelectFile);
  }
  return send(answer);
};

const sendGoogleDrive = () => {
  console.log('파일목록은 아래와 같습니다');
  fs.readdir(__dirname, (err, files) => {
    console.log('');
    files.forEach(file => console.log(file));
  });
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('구글드라이브로 보낼 파일을 선택하세요', SelectFile);
};

sendGoogleDrive();