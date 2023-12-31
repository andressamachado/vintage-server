// (input) validation for User data

// Register validation
function validateUser(req, res, next) {
  const user = req.body;

  if (!user) {
    return "No Data received";
  }

  // Regex for email validation
  // eg. user@domain.com
  const mailFormat =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  // Regex for phone validation
  // eg. +1 (xxx) xxx-xxxx
  const phoneFormat =
    /^\+?(\d{1})\)?[ ]?\(?(\d{3})\)?[-  ]?(\d{3})[- ]?(\d{4})$/;

  // Check for presence of all required fields
  const missingFields = [];

  Object.keys(user).forEach((key) => {
    if (key === "isAdmin") return;

    if (!user[key]) missingFields.push(`${key}`);
  });

  // Check fields with enforced formats
  if (user.email && !mailFormat.test(user.email)) {
    missingFields.push("E-mail is not in proper format");
  }

  if (user.phone && !phoneFormat.test(user.phone)) {
    missingFields.push("Phone is not in proper format");
  }

  if (missingFields.length > 0) {
    return res
      .status(422)
      .json({ message: "Required Fields not found:", errors: missingFields });
  }

  next();
}

// Login validation
function validateUserLogin(req, res, next) {
  const { email, password } = req.body;

  // Check for presence of required fields
  const missingFields = ["Please enter the required fields: "];
  if (!email) missingFields.push("[E-mail]");
  if (!password) missingFields.push(" [Password ]");

  if (missingFields.length > 1) {
    return res.status(400).send(missingFields);
  }

  next();
}

module.exports = {
  validateUser,
  validateUserLogin,
};
