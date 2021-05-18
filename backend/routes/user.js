const router = require("express").Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/profils", auth, userCtrl.getAllUsers);
router.put("/profil/:id", auth, multer, userCtrl.updateProfil);
router.get("/profil/:id", auth, userCtrl.getProfil);
router.delete("/profil/:id", auth, userCtrl.deleteProfil);

module.exports = router;