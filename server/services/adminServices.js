const courseModel = require("../model/courseModel")

module.exports ={
    addCourse:(data)=>{
        return new Promise((resolve, reject) => {
            new courseModel(data).save()
            .then(val=>resolve(val))
            .catch(err=>reject(err))
        })
    },
    getCourses:()=>{
        return new Promise((resolve, reject) => {
            courseModel.find({}).sort({createdAt:-1})
            .then(val=>resolve(val))
            .catch(err=>reject(err))
        })
    },
    removeCourse:(_id)=>{
        return new Promise((resolve, reject) => {
            courseModel.findOneAndRemove({_id})
            .then(val=>resolve(val))
            .catch(err=>reject(err))
        })
    },
    courseExits:(name)=>{
        return new Promise((resolve, reject) => {
            courseModel.findOne({name})
            .then(val=>resolve(val))
            .catch(err=>reject(err))
        })
        
    }
}