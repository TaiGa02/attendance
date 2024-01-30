import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();


export const PUT = async (req: NextRequest, res: NextResponse) => {
    try {
        await prisma.$connect();
        const { name, password, work, remote, rest, out } = await req.json();

        const employee = await prisma.employee.findFirst({ where: { name: name, password: password } });
        const id = employee?.id;

        if (id) {
            if (!employee.work) {
                return NextResponse.json({ message: "AlreadyLeaving" }, { status: 400 });
            }

            const endTime = new Date();
            if (employee.startTime) {
                const monthly_time = calculateWorkTime(employee.startTime, endTime);
                const monthly_overtime = calculateOvertime(monthly_time);
            
                const attendance = await prisma.employee.update({
                    data: {
                        work, remote, rest, out,
                        monthly_time: { increment: monthly_time },
                        monthly_overtime: { increment: monthly_overtime },
                        endTime: endTime,
                    },
                    where: { id },
                });
                return NextResponse.json({ message: "Success", attendance }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Error: StartTime is null" }, { status: 500 });
            }
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

function calculateWorkTime(startTime: Date, endTime: Date): number {
    const totalWorkTimeMillis = endTime.getTime() - startTime.getTime();
    const totalWorkTimeMinutes = totalWorkTimeMillis / (1000 * 60); // 分に変換

    // 6時間未満ならそのまま返す
    if (totalWorkTimeMinutes < 360) { // 6時間 * 60分
        return totalWorkTimeMinutes;
    } else {
        // 6時間以上なら休憩の1時間を引いた値を返す
        return totalWorkTimeMinutes - 60;
    }
}

function calculateOvertime(workTime: number): number {
    const STANDARD_WORK_MINUTES = 480;
    const overtime = Math.max((workTime + 60) - STANDARD_WORK_MINUTES, 0);
    return overtime;
  }
