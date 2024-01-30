import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import schedule from "node-schedule";

const prisma = new PrismaClient();

// メールを送信する関数
// const sendEmail = async (to: string, subject: string, text: string) => {
//   const transporter = nodemailer.createTransport({
//     service: "outlook",
//     auth: {
//       user: "d-taiga.4869@outlook.jp",
//       pass: "Dtaiga4869",
//     },
//   });

//   const mailOptions = {
//     from: "d-taiga.4869@outlook.jp",
//     to,
//     subject,
//     text,
//   };

//   await transporter.sendMail(mailOptions);
// };


export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    await prisma.$connect();
    const { name, password, work, remote } = await req.json();

    const employee = await prisma.employee.findFirst({ where: { name, password } });
    const id = employee?.id;

    if (id) {
      if (employee.work) {
        return NextResponse.json({ message: "AlreadyWorking" }, { status: 400 });
      }

      const startTime = new Date();
      const attendance = await prisma.employee.update({
        data: { work, remote, startTime },
        where: { id },
      });

    //   if (remote) {
    //     await sendEmail(employee.email, "本日の予定", "本日の予定作業を送付してください");

    //   }

      return NextResponse.json({ message: "Success", attendance }, { status: 200 });
    } else {
      return NextResponse.json({ message: "InvalidCredentials" }, { status: 401 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
