// importing the fs module
import * as fs from "fs"

 const dir = process.cwd()
// reading a JSON file asynchronously
fs.readFile(`${dir}/user.json`, (error, data) => {
  if (error) {
    // logging the error
    console.error(error);

    throw err;
  }

  // parsing the JSON object
  // to convert it to a JavaScript object
  const user = JSON.parse(data);

  // printing the JavaScript object
  // retrieved from the JSON file
  console.log(user);
});