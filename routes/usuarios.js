const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosPath,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");
const { check } = require("express-validator");

// const { validarCampos } = require("../middlewares/validarCampos");
// const { validarJWT } = require("../middlewares/validarJWT");
// const { esAdminRole, tieneRole } = require("../middlewares/validarRoles");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/dbValidators");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo").custom(emailExiste),
    // check("correo", "El correo no es valido").isEmail(),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolValido),

    validarCampos,
  ],
  usuariosPut
);

router.patch("/", usuariosPath);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
