import EntityPage from "../components/crud/EntityPage";
import { carInventoryConfig } from "../entities/carInventory/config";

function CarInventory() {
  return <EntityPage {...carInventoryConfig} />;
}

export default CarInventory;
