export function convertToSnakeCase(text: String) {
  const vietnameseMap = {
    "à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ": "a",
    "è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ": "e",
    "ì|í|ị|ỉ|ĩ": "i",
    "ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ": "o",
    "ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ": "u",
    "ỳ|ý|ỵ|ỷ|ỹ": "y",
    đ: "d",
    " ": "_",
  };

  for (const pattern in vietnameseMap) {
    text = text.replace(new RegExp(pattern, "g"), vietnameseMap[pattern]);
  }

  return text.toLowerCase();
}
