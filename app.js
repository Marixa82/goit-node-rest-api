import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


export default app;

// import ElasticEmail from '@elasticemail/elasticemail-client';
// import "dotenv/config";
// const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;

// const defaultClient = ElasticEmail.ApiClient.instance;

// const { apikey } = defaultClient.authentications;
// apikey.apiKey = ELASTICEMAIL_API_KEY

// const api = new ElasticEmail.EmailsApi()

// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [
//     new ElasticEmail.EmailRecipient("marixa3082@meta.ua ")
//   ],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: "HTML",
//         Content: "My test email content ;)"
//       })
//     ],
//     Subject: "Test email",
//     From: ELASTICEMAIL_FROM
//   }
// });

// const callback = function (error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully.');
//   }
// };
// api.emailsPost(email, callback);

// import nodemailer from "nodemailer";
// const { META_EMAIL, META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: 'smtp.meta.ua',
//   port: 465,
//   secure: true,
//   auth: {
//     user: META_EMAIL,
//     pass: META_PASSWORD,
//   },
// }
// const transporter = nodemailer.createTransport(nodemailerConfig);
// const emailOptions = {
//   from: META_EMAIL,
//   to: "091122tester@gmail.com",
//   subject: 'Nodemailer test',
//   text: 'Привіт. Ми тестуємо надсилання листів!',
// };

// transporter
//   .sendMail(emailOptions)
//   .then(info => console.log(info, "email send success"))
//   .catch(err => console.log(err));