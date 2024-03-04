const gallery = require("../Models/Gallery")

const fs = require("fs")

async function getRecord(req, res) {
    try {
        let data = await gallery.find().sort({ _id: -1 })
        if (data) {
            res.send({ status: 200, result: "Done", count: data.length, message: "Data Displayed successfully", data: data })
        }
    } catch (error) {
        res.send({ status: 500, result: "Failed", message: "Error Occured while Getting Data" })
    }

}
async function getSingleRecord(req, res) {

    try {
        let data = await gallery.findOne({ _id: req.params._id })
        // console.log(data._id);
        if (data) {
            res.send({ status: 200, result: "Done", count: data.length, message: "Data Displayed successfully", data: data })
        }
    } catch (error) {
        res.send({ status: 500, result: "Failed", message: "Error Occured while Getting Data" })
    }

}

async function createRecord(req, res) {
    try {
        let data = await new gallery(req.body)
        if (req.files.pic1) {
            data.pic1 = req.files.pic1[0].path
        }
        if (req.files.pic2) {
            data.pic2 = req.files.pic2[0].path
        }
        if (req.files.pic3) {
            data.pic3 = req.files.pic3[0].path
        }
        if (req.files.pic4) {
            data.pic4 = req.files.pic4[0].path
        }
        await data.save()

        res.send({ status: 200, result: "Done", count: data.length, message: "Data Saved Successfully", data: data })
    } catch (error) {
        console.log(error);
        res.send({ status: 500, result: "failed", message: "Data storage failed" })
    }
}

async function deleteRecord(req, res) {
    try {
        let data = await gallery.findOne({ _id: req.params._id })
        console.log(`before delete data is`,data);
        if (data) {
            try {
                fs.unlinkSync(data.pic1);
            } catch (error) { }
            try {
                fs.unlinkSync(data.pic2)
            } catch (error) {

            }
            try {
                fs.unlinkSync(data.pic3)
            } catch (error) {

            }
            try {
                fs.unlinkSync(data.pic4)
            } catch (error) {

            }
            await data.deleteOne()
            console.log(`data after delete is if undefined data deleted succesfully`, await data.deleteOne());
            res.send({ status: 200, result: "Done", message: "Data Deleted Successfully" })
        }

    } catch (error) {
        res.send({ status: 500, result: "Failed", message: "Internal Server Error" })
    }
}

async function updateRecord(req,res){
    try {
        let data = await gallery.findOne({_id:req.params._id})
        console.log(`before update data is`,data);
        if (req.files.pic1) {
            try {
                fs.unlinkSync(data.pic1)
            } catch (error) { }
            data.pic1 = await req.files.pic1[0].path
        }
        if (req.files.pic2) {
            try {
                fs.unlinkSync(data.pic2)
            } catch (error) { }
            data.pic2 = await req.files.pic2[0].path
        }
        if (req.files.pic3) {
            try {
                fs.unlinkSync(data.pic3)
            } catch (error) { }
            data.pic3 = await req.files.pic3[0].path
        }
        if (req.files.pic4) {
            try {
                fs.unlinkSync(data.pic4)
            } catch (error) { }
            data.pic4 = await req.files.pic4[0].path
        }

        await data.save()
       res.send({ status: 200, result: "Done", count: data.length, message: "Data updated Successfully", data: data })
    } catch (error) {
        res.send({status:500,result:"Failed",message:`Error in updating record ${error}`})
    }
}

module.exports = {
    createRecord: createRecord,
    getSingleRecord: getSingleRecord,
    getRecord: getRecord,
    deleteRecord:deleteRecord,
    updateRecord:updateRecord
}