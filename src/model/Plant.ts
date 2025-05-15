import mongoose, { Model, Schema } from "mongoose";


interface IPlant extends Document {
    commonName: string;
    scientificName: string;
    description: string;
}

const PlantSchema: Schema<IPlant> = new mongoose.Schema({
    commonName: {type: String, required: false },
    scientificName: { type: String, required: true},
    description: { type: String, required: true}
})

export const Plant: Model<IPlant> = mongoose.model<IPlant>('Plant', PlantSchema);