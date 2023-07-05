import prisma from "libs/prisma";

export async function findAll(errorOptions = {}) {
  try {
    return await prisma.payment.findMany({});
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

export async function findById(paymentId, errorOptions = {}) {
  try {
    return await prisma.payment.findFirstOrThrow({
      where: { id: paymentId },
      include: { student: true },
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

export async function create(newPayment, errorOptions = {}) {
  try {
    const payment = await prisma.payment.create({
      data: { ...newPayment },
    });

    return payment;
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

export async function updateById(paymentId, updatedPayment, errorOptions = {}) {
  try {
    const payment = await prisma.payment.update({
      data: { ...updatedPayment, updatedAt: new Date() },
      where: { id: paymentId },
    });

    return payment;
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

export async function deleteById(paymentId, errorOptions = {}) {
  try {
    await prisma.payment.delete({
      where: { id: paymentId },
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

