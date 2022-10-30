import {ClubModel} from "./ClubModel";

export interface ResultModel {
    home: ClubModel;
    homeGoals: number;
    away: ClubModel;
    awayGoals: number;
}
