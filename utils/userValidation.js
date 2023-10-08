// (input) validation for User data

function validateUser(req, res, next) {
  // Uppercase (A-Z) and lowercase (a-z), Digits (0-9).
  // Characters ! # $ % & ' * + - / = ? ^ _ ` { | } ~
  // Character .( dot ) provided that it is not the first or last character; and it will not come one after the other.
  const mailFormat =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  // +1 (xxx) xxx-xxxx
  const phoneFormat =
    /^\+?(\d{1})\)?[ ]?\(?(\d{3})\)?[-  ]?(\d{3})[- ]?(\d{4})$/;
  const user = req.body;
  if (!user) {
    return "No Data received";
  }

  // Check for presence of all required fields
  const missingFields = [];
  Object.keys(user).forEach((key) => {
    if (key === "isAdmin") return;
    if (!user[key]) {
      missingFields.push(`- ${key}`);
    }
  });

  console.log(user.password);

  // Check fields with enforced formats
  if (user.email && !mailFormat.test(user.email)) {
    missingFields.push("- email is not in proper format\n");
  }

  if (user.phone && !phoneFormat.test(user.phone)) {
    missingFields.push("- phone is not in proper format\n");
  }

  console.log(missingFields);
  if (missingFields.length > 0) {
    return res
      .status(422)
      .json({ message: "Required Fields not found:", errors: missingFields });
    // return "Required Fields not found: " + missingFields;
  }

  next();
}

module.exports = {
  validateUser,
};
