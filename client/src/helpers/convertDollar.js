function convertToDollar (number) {
  let numberString = String(number)
  let result = ''
  let j = 0
  for (let i = numberString.length - 1; i >= 0; i--) {
    if (j % 3 === 0 && j !== 0) {
      result = ',' + result
    }

    result = numberString[i] + result

    j += 1
  }
  return `$${result}`
}

//  console.log(convertToRupiah(100000000));
module.exports = convertToDollar
