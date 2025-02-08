import { config } from "dotenv";
config();
import { connect_db } from "../lib/connect.js";
import User from "../models/user.model.js";

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    Fullname: "Emma Thompson",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/women/1.jpg",
    Username: "EmmaThompson",
  },
  {
    email: "olivia.miller@example.com",
    Fullname: "Olivia Miller",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/women/2.jpg",
    Username: "OliviaMiller",
  },
  {
    email: "sophia.davis@example.com",
    Fullname: "Sophia Davis",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/women/3.jpg",
    Username: "SophiaDavis",
  },
  {
    email: "ava.wilson@example.com",
    Fullname: "Ava Wilson",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/women/4.jpg",
    Username: "AvaWilson",
  },
  {
    email: "isabella.brown@example.com",
    Fullname: "Isabella Brown",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/women/5.jpg",
    Username: "IsabellaBrown",
  },
  {
    email: "mia.johnson@example.com",
    Fullname: "Mia Johnson",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/women/6.jpg",
    Username: "MiaJohnson",
  },
  {
    email: "charlotte.williams@example.com",
    Fullname: "Charlotte Williams",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/women/7.jpg",
    Username: "CharlotteWilliams",
  },
  {
    email: "amelia.garcia@example.com",
    Fullname: "Amelia Garcia",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/women/8.jpg",
    Username: "AmeliaGarcia",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    Fullname: "James Anderson",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/men/1.jpg",
    Username: "JamesAnderson",
  },
  {
    email: "william.clark@example.com",
    Fullname: "William Clark",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/men/2.jpg",
    Username: "WilliamClark",
  },
  {
    email: "benjamin.taylor@example.com",
    Fullname: "Benjamin Taylor",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/men/3.jpg",
    Username: "BenjaminTaylor",
  },
  {
    email: "lucas.moore@example.com",
    Fullname: "Lucas Moore",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/men/4.jpg",
    Username: "LucasMoore",
  },
  {
    email: "henry.jackson@example.com",
    Fullname: "Henry Jackson",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/men/5.jpg",
    Username: "HenryJackson",
  },
  {
    email: "alexander.martin@example.com",
    Fullname: "Alexander Martin",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/men/6.jpg",
    Username: "AlexanderMartin",
  },
  {
    email: "daniel.rodriguez@example.com",
    Fullname: "Daniel Rodriguez",
    password: "123456",
    profile_pic: "https://randomuser.me/api/portraits/men/7.jpg",
    Username: "DanielRodriguez",
  },
];

const seedDatabase = async () => {
  try {
    await connect_db();

    await User.deleteMany({});

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
