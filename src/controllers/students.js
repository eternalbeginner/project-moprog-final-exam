import { responseFromThrownError } from "libs/util";
import * as models from "models/students";

export async function findAll(_, res) {
  try {
    const students = await models.findAll();

    return res.json({
      data: students,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

export async function findById(req, res) {
  try {
    const student = await models.findById(req.params.studentId);

    return res.json({
      data: student,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

export async function create(req, res) {
  try {
    const newStudent = await models.create({
      nim: req.body.nim,
      name: req.body.name,
      major: req.body.major,
      avatarUrl: req.body.avatar_url ?? req.body.avatarUrl,
    });

    return res.json({
      data: newStudent,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

export async function updateById(req, res) {
  try {
    const updatedStudent = await models.updateById(req.params.studentId, {
      ...("nim" in req.body ? { nim: req.body.nim } : {}),
      ...("name" in req.body ? { name: req.body.name } : {}),
      ...("major" in req.body ? { major: req.body.major } : {}),
      ...("avatarUrl" in req.body ? { avatarUrl: req.body.avatarUrl } : {}),
      ...("avatar_url" in req.body ? { avatarUrl: req.body.avatar_url } : {}),
    });

    return res.json({
      data: updatedStudent,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}

export async function deleteById(req, res) {
  try {
    await models.deleteById(req.params.studentId);

    return res.json({
      data: true,
      error: [],
    });
  } catch (err) {
    return responseFromThrownError(res, err.message);
  }
}
