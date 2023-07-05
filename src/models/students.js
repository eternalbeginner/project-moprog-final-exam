import prisma from "libs/prisma";

export async function findAll(errorOptions = {}) {
  try {
    return await prisma.student.findMany({});
  } catch (err) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: err.message,
        type: "fetch",
        ...errorOptions,
      }),
    );
  }
}

export async function findById(studentId, errorOptions = {}) {
  try {
    return await prisma.student.findFirstOrThrow({
      where: { id: studentId },
      include: {
        payments: true,
        _count: { select: { payments: true } },
      },
    });
  } catch (err) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: err.message,
        type: "fetch",
        ...errorOptions,
      }),
    );
  }
}

export async function create(newStudent, errorOptions = {}) {
  try {
    const student = await prisma.student.create({
      data: {
        ...newStudent,
        updatedAt: new Date(),
      },
    });

    return student;
  } catch (err) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: err.message,
        type: "create",
        ...errorOptions,
      }),
    );
  }
}

export async function updateById(studentId, updatedStudent, errorOptions = {}) {
  try {
    const student = await prisma.student.update({
      data: { ...updatedStudent },
      where: { id: studentId },
    });

    return student;
  } catch (err) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: err.message,
        type: "update",
        ...errorOptions,
      }),
    );
  }
}

export async function deleteById(studentId, errorOptions = {}) {
  try {
    await prisma.student.delete({
      where: { id: studentId },
    });

    return true;
  } catch (err) {
    throw new Error(
      JSON.stringify({
        code: 500,
        message: err.message,
        type: "delete",
        ...errorOptions,
      }),
    );
  }
}

