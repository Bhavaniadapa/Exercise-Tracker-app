const Workout = require('../models/workoutModels.js')
const mongoose = require('mongoose')
//get all workouts
const getWorkouts = async (req,res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
//single workouts
const getWorkout = async (req,res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "no search found"})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error :'no search found'})
    }
    res.status(200).json(workout)
}
// create new workout
const createWorkout = async (req,res) =>{
    const {title,load,reps} = req.body
    const emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'please fill all the entries',emptyFields})
    }
    try{
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(404).json({error: error.message})
    }
}
//delete 

const deleteWorkout = async (req,res) =>{
    const { id } =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"no search found"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(404).json({error :'no search found'})
    }
    res.status(200).json(workout)
}

// update
const updateWorkout = async(req,res) =>{
    const { id } =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"no search found"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error :'no search found'})
    }
    res.status(200).json(workout)

}

module.exports ={
    getWorkout,
    getWorkouts,
    deleteWorkout,
    createWorkout,
    updateWorkout
}
