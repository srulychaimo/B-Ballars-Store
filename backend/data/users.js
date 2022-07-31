import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Avi Pro",
    email: "avi@avi.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Eli Pro",
    email: "eli@eli.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
