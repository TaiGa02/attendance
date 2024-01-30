import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
      await prisma.$connect();
      const { name, password, email } = await req.json();

      const newUser = await prisma.employee.create({
      data: { name, password, email },
    });
      return NextResponse.json({ message: "Success", newUser }, {status: 201})
      
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: "Error" }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
  