function validateName(name) {
  if (name === "") {
    return {
      isInvalid: true,
      message: "Please provide product name",
    };
  } else {
    return {
      isInvalid: false,
      message: "",
    };
  }
}

function validateDescription(description) {
  if (description === "" || description === null || description === undefined) {
    return {
      isInvalid: true,
      message: "Please provide product description",
    };
  } else {
    return {
      isInvalid: false,
      message: "",
    };
  }
}

function validatePrice(price) {
  if (price === "") {
    return {
      isInvalid: true,
      message: "Please provide product price",
    };
  } else {
    return {
      isInvalid: false,
      message: "",
    };
  }
}

function validateQuantity(quantity) {
  if (quantity === "") {
    return {
      isInvalid: true,
      message: "Please provide product quantity",
    };
  } else if (quantity >= 10000) {
    return {
      isInvalid: true,
      message: "Please provide quantity less than 10000",
    };
  } else {
    return {
      isInvalid: false,
      message: "",
    };
  }
}

module.exports = {
  validateName,
  validateDescription,
  validatePrice,
  validateQuantity,
};
