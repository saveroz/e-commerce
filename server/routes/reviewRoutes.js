const express = require("express")
const router = express.Router()
const ReviewController = require("../controllers/ReviewController")
const authentication = require("../middleware/authentication")


router.get("/", ReviewController.getAll)
router.get("/:id", ReviewController.getByProduct)

router.use(authentication)
router.post("/", ReviewController.validateBuy, ReviewController.create)
router.patch("/:id", ReviewController.update)




module.exports = router
