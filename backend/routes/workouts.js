const express = require('express')
const {
    getWorkout,
    getWorkouts,
    deleteWorkout,
    createWorkout,
    updateWorkout
    } = require('../controller/workoutController')
const router = express.Router()

router.get('/',getWorkouts)

router.get('/:id',getWorkout)


router.post('/',createWorkout)

router.delete('/:id',deleteWorkout)


router.patch('/:id',updateWorkout)

module.exports = router
