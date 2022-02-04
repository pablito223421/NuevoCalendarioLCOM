import {Info_Calendario} from "./Info_Calendario";
import {Info_Mentor} from "./Info_Mentor";

export type Citas = {
  mentor: Info_Mentor;
  calendar: Info_Calendario[];
};