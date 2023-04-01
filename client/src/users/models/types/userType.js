import { shape, string, bool } from "prop-types";
import addressType from "./addressType";
import imageType from "./imageType";
import nameType from "./nameType";

const userType = shape({
  _id: string.isRequired,
  name: nameType,
  phone: string.isRequired,
  email: string.isRequired,
  image: imageType.isRequired,
  address: addressType.isRequired,
  isAdmin: bool.isRequired,
  isBusiness: bool.isRequired,
});

export default userType;
