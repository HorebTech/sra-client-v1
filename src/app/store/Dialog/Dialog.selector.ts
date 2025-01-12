import { createFeatureSelector } from "@ngrx/store";
import { DialogModel } from "../../models/Dialog.model";

const dialogState = createFeatureSelector<DialogModel>('showDialog');
