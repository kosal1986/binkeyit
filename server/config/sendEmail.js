import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API);

if (!process.env.RESEND_API) {
  console.log("Provide Resend API inside the .env file");
}

const sendEmail = async ({ name, sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Binkeyit<onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });
    if (error) {
      console.error({ error });
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
