import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();


export const PUT = async (req: NextRequest, res: NextResponse) => {
    try {
        await prisma.$connect();
        const { name, password, rest} = await req.json();

        const employee = await prisma.employee.findFirst({ where: { name: name, password: password } });
        const id = employee?.id;

        if (id) {
            if (!employee.work) {
                return NextResponse.json({ message: "AlreadyLeaving" }, { status: 400 });
            }

            const attendance = await prisma.employee.update({
                data: { rest },
                where: { id },
            });

            if(rest){
                setTimeout(async () => {
                    await prisma.employee.update({
                        data: { rest: false },
                        where: { id },
                    });
                }, 60 * 60 * 1000);
            }
            return NextResponse.json({ message: "Success", attendance }, { status: 200 });
        } else {
            return NextResponse.json({ message: "InvalidCredentials" }, { status: 401 });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};
