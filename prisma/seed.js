import { PrismaClient, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient({ log: ["error", "info"] });

async function main() {
  const studentOne = prisma.student.create({
    data: {
      nim: "210030019",
      name: "Dwi Payana",
      major: "Sistem Informasi",
      avatarUrl: "/images/image-1.jpg",
      payments: {
        createMany: {
          data: [
            { nominal: 6000000, semester: "I", status: PaymentStatus.PAID },
            { nominal: 6000000, semester: "II", status: PaymentStatus.PAID },
          ],
        },
      },
    },
  });

  const studentTwo = prisma.student.create({
    data: {
      nim: "200030019",
      name: "Astrid Triana",
      major: "Sistem Informasi",
      avatarUrl: "/images/image-1.jpg",
      payments: {
        createMany: {
          data: [
            { nominal: 6000000, semester: "I", status: PaymentStatus.PAID },
            { nominal: 6000000, semester: "II", status: PaymentStatus.PAID },
            { nominal: 6000000, semester: "III", status: PaymentStatus.PAID },
            {
              nominal: 3000000,
              semester: "IV",
              status: PaymentStatus.HALF_PAID,
            },
          ],
        },
      },
    },
  });

  await prisma.$transaction([studentOne, studentTwo]);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    if (err) console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

