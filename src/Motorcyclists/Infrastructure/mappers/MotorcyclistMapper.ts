import { MotorcyclistId } from "src/Motorcyclists/Domain/MotorcyclistId";
import { MotorcyclistIsAvailable } from "src/Motorcyclists/Domain/MotorcyclistIsAvailable";
import { Motorcyclist } from "src/Motorcyclists/Domain/Motorcyclists";
import { MotorcyclistPlain } from "./MotorcyclistPlain";

export const MotorcyclistMapper = {
  toDomain: (motorcyclist: MotorcyclistPlain): Motorcyclist => {
    return new Motorcyclist({
      motorcyclistId: new MotorcyclistId(motorcyclist.id),
      available: new MotorcyclistIsAvailable(motorcyclist.isAvailable),
    });
  },
};
