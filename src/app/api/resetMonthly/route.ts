import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        await prisma.$connect();
        
        const currentDate = new Date();
        const isNewMonth = currentDate.getDate() === 1;

        if (isNewMonth) {
            await prisma.employee.updateMany({
                data: {
                    monthly_time: 0,
                    monthly_overtime: 0,
                },
            });
        }

        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};