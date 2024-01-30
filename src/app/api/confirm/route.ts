import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
      await prisma.$connect();
      const { adminName, adminPassword } = await req.json();
      const admin = await prisma.admin.findFirst({ where: { name: adminName, password: adminPassword } });
      if (admin) {
        return NextResponse.json({ message: "Success", admin }, { status: 201 });
      } else {
        return NextResponse.json({ message: "入力されたデータが一致していません" }, { status: 500 });
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
  