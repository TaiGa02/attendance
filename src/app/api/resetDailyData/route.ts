import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        await prisma.$connect();
        
        const currentDate = new Date();
        await prisma.employee.updateMany({
            where: {
                startTime: {
                    not: null,
                    lt: new Date(currentDate.toISOString().split("T")[0]), // startTimeの日付が現在の日付より前
                },
            },
            data: {
                startTime: null,
                endTime: null,
                work: false,
                rest: false,
                remote: false,
                out: false,
            },
        });

        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};