export const isAdmin = (info) => {
  return info.appRole.roleName === "ROLE_ADMIN";
};

export const isLogin = (info) => {
  return info.userName !== "";
};

export async function getByteArray(f) {
  let byteArray = await fileToByteArray(f);
  return byteArray;
}

function fileToByteArray(file) {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      let fileByteArray = [];
      reader.readAsArrayBuffer(file);
      reader.onloadend = (evt) => {
        if (evt.target.readyState == FileReader.DONE) {
          let arrayBuffer = evt.target.result;
          let array = new Uint8Array(arrayBuffer);
          for (const byte of array) {
            fileByteArray.push(byte);
          }
        }
        resolve(fileByteArray);
      };
    } catch (e) {
      reject(e);
    }
  });
}
