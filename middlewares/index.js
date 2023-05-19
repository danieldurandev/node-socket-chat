const validaCampos = require("./validarCampos");
const validaJWT = require("./validarJWT");
const validaRoles = require("./validarRoles");
const validaArchivo = require("./validarArchivo");

module.exports = {
  ...validaRoles,
  ...validaCampos,
  ...validaJWT,
  ...validaArchivo,
};
