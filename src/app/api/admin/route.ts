import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();


export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await prisma.$connect();
        const employees = await prisma.employee.findMany();
        return NextResponse.json({ message: "Success", employees }, {status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, {status: 500});
    } finally{
        await prisma.$disconnect();
    }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const { keyword } = await req.json();

        await prisma.$connect();
        const resultEmployee = await prisma.employee.findMany({where: {name: {contains: keyword,},},});
        return NextResponse.json({ message: "Success", resultEmployee}, {status: 201});
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, {status:500});
    } finally{
        await prisma.$disconnect();
    }
};