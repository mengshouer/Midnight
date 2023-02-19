import type { Session } from "next-auth";
import prisma from "./prisma";

interface JDDBInfoProps {
  [name: string]: {
    cookie: string;
    remarks: string;
  };
}

export async function upsert(
  session: Session,
  pt_pin: string,
  cookie: string,
  remarks = ""
): Promise<boolean> {
  try {
    const user = await prisma.user.findFirst({
      where: { email: session?.user.email as string },
    });
    // update or create
    const jd_info: JDDBInfoProps = user?.jd_info
      ? JSON.parse(user?.jd_info)
      : {};
    jd_info[pt_pin] = {
      cookie,
      remarks,
    };
    await prisma.user.update({
      where: { email: session?.user.email as string },
      data: {
        jd_info: JSON.stringify(jd_info),
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function remove(
  session: Session,
  pt_pin: string
): Promise<boolean> {
  try {
    const user = await prisma.user.findFirst({
      where: { email: session?.user.email as string },
    });
    // remove
    const jd_info: JDDBInfoProps = user?.jd_info
      ? JSON.parse(user?.jd_info)
      : {};
    delete jd_info[pt_pin];
    await prisma.user.update({
      where: { email: session?.user.email as string },
      data: {
        jd_info: JSON.stringify(jd_info),
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}
