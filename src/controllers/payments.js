import { responseFromThrownError } from "libs/util";
import * as models from "models/payments";

export async function findAll(_, res) {
  try {
    const payments = await models.findAll();

    return res.json({
      data: payments,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

export async function findById(req, res) {
  try {
    const payment = await models.findById(req.params.paymentId);

    return res.json({
      data: payment,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

export async function create(req, res) {
  try {
    const newPayment = await models.create({
      nominal: req.body.nominal,
      semester: req.body.semester,
      status: req.body.status,
      student: { connect: { id: req.body.studentId } },
    });

    return res.json({
      data: newPayment,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

export async function updateById(req, res) {
  try {
    const updatedPayment = await models.updateById(req.params.paymentId, {
      ...("studentId" in req.body ? { studentId: req.body.studentId } : {}),
      ...("nominal" in req.body ? { nominal: req.body.nominal } : {}),
      ...("semester" in req.body ? { semester: req.body.semester } : {}),
      ...("status" in req.body ? { status: req.body.status } : {}),
    });

    return res.json({
      data: updatedPayment,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

export async function deleteById(req, res) {
  try {
    await models.deleteById(req.params.paymentId);

    return res.json({
      data: true,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

